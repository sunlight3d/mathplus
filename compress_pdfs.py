#!/usr/bin/env python3
"""
Compress and optimize PDF files with identical output filenames.
Output directory is created at the SAME LEVEL as the input directory.

Usage:
    python3 compress_pdfs.py [INPUT_DIR] [--dpi 130] [--quality 65]

Example:
    python3 compress_pdfs.py public/documents/temp
    -> Output folder will be created at: public/documents/output/
"""

import sys
import os
import io
import time
import argparse
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor, as_completed

import pymupdf
from PIL import Image


def compress_single_pdf(args_tuple):
    """
    Compress a single PDF file using PyMuPDF and Pillow.
    Returns (filename, orig_size_mb, new_size_mb, success, error_message)
    """
    input_file, output_file, dpi, quality = args_tuple
    filename = input_file.name
    orig_size_bytes = os.path.getsize(input_file)
    orig_size_mb = orig_size_bytes / (1024 * 1024)

    try:
        doc = pymupdf.open(input_file)
        new_doc = pymupdf.open()

        for page in doc:
            rect = page.rect
            # Render page at desired DPI
            pix = page.get_pixmap(dpi=dpi)
            
            # Check image mode (RGB or Grayscale)
            if pix.n == 1:
                img = Image.frombytes("L", [pix.width, pix.height], pix.samples)
            elif pix.n >= 3:
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples[:pix.width * pix.height * 3])
            else:
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

            # Re-encode to optimized JPEG
            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=quality, optimize=True)
            img_data = buf.getvalue()

            new_page = new_doc.new_page(width=rect.width, height=rect.height)
            new_page.insert_image(rect, stream=img_data)

        # Save to output file with exact same name
        new_doc.save(output_file, garbage=4, deflate=True)
        doc.close()
        new_doc.close()

        new_size_bytes = os.path.getsize(output_file)
        new_size_mb = new_size_bytes / (1024 * 1024)
        return (filename, orig_size_mb, new_size_mb, True, "")
    except Exception as e:
        return (filename, orig_size_mb, 0, False, str(e))


def main():
    parser = argparse.ArgumentParser(description="Compress PDF files with identical output filenames.")
    parser.add_argument(
        "input_dir",
        nargs="?",
        default="public/documents/temp",
        help="Path to the directory containing original PDF files (default: public/documents/temp)",
    )
    parser.add_argument(
        "--dpi",
        type=int,
        default=130,
        help="DPI resolution for rendering pages (default: 130 for sharp text/math)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=65,
        help="JPEG quality 1-100 (default: 65 for high compression & crisp readability)",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=max(1, os.cpu_count() - 1),
        help="Number of parallel worker processes",
    )

    args = parser.parse_args()

    input_path = Path(args.input_dir).resolve()
    if not input_path.exists() or not input_path.is_dir():
        # Fallback to public/documents if temp does not exist
        fallback_path = Path("public/documents").resolve()
        if fallback_path.exists():
            input_path = fallback_path
        else:
            print(f"❌ Error: Input directory '{input_path}' not found!")
            sys.exit(1)

    # Output directory is created AT THE SAME LEVEL as the input directory
    output_path = input_path.parent / "output"
    output_path.mkdir(parents=True, exist_ok=True)

    # Find all PDF files (case-insensitive)
    pdf_files = [f for f in input_path.iterdir() if f.is_file() and f.suffix.lower() == ".pdf"]

    if not pdf_files:
        print(f"⚠️ No PDF files found in: {input_path}")
        sys.exit(0)

    print("=" * 70)
    print("🚀 MATHPLUS PDF COMPRESSION TOOL")
    print("=" * 70)
    print(f"📁 Thư mục gốc:    {input_path}")
    print(f"📂 Thư mục output: {output_path} (CÙNG CẤP)")
    print(f"📄 Tổng số file:   {len(pdf_files)} files")
    print(f"⚙️ Cấu hình:       DPI={args.dpi} | Quality={args.quality} | Workers={args.workers}")
    print("=" * 70)

    tasks = [
        (pdf_file, output_path / pdf_file.name, args.dpi, args.quality)
        for pdf_file in sorted(pdf_files)
    ]

    start_time = time.time()
    total_orig_mb = 0.0
    total_new_mb = 0.0
    success_count = 0

    with ProcessPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(compress_single_pdf, task): task[0].name for task in tasks}

        for i, future in enumerate(as_completed(futures), 1):
            filename, orig_mb, new_mb, success, err = future.result()
            total_orig_mb += orig_mb

            if success:
                total_new_mb += new_mb
                success_count += 1
                ratio = (1 - (new_mb / orig_mb)) * 100 if orig_mb > 0 else 0
                print(
                    f"[{i:02d}/{len(pdf_files):02d}] ✅ {filename[:45]:<45} "
                    f"| {orig_mb:>6.1f} MB ➔ {new_mb:>5.1f} MB (giảm {ratio:>4.1f}%)"
                )
            else:
                print(f"[{i:02d}/{len(pdf_files):02d}] ❌ {filename}: {err}")

    elapsed = time.time() - start_time
    total_saved_mb = total_orig_mb - total_new_mb
    total_ratio = (total_saved_mb / total_orig_mb * 100) if total_orig_mb > 0 else 0

    print("=" * 70)
    print("🎉 HOÀN THÀNH XỬ LÝ!")
    print(f"⏱️ Thời gian:       {elapsed:.1f} giây")
    print(f"📊 Thành công:      {success_count}/{len(pdf_files)} files")
    print(f"📦 Dung lượng gốc:  {total_orig_mb:.2f} MB ({total_orig_mb/1024:.2f} GB)")
    print(f"📉 Sau khi nén:     {total_new_mb:.2f} MB")
    print(f"💾 Tiết kiệm được:  {total_saved_mb:.2f} MB (Giảm {total_ratio:.1f}%)")
    print(f"📂 Vị trí lưu file: {output_path}")
    print("=" * 70)


if __name__ == "__main__":
    main()
