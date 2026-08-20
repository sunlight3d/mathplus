#!/bin/bash
set -e

VPS_IP="103.176.178.110"
VPS_USER="root"
REMOTE="${VPS_USER}@${VPS_IP}"

echo "=========================================================="
echo "🚀 DEPLOY MATHPLUS TO VPS ($REMOTE)"
echo "=========================================================="

# Step 1: Ensure Git status is clean and pushed
echo "📦 Step 1: Checking local Git repository..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Có thay đổi chưa commit. Đang commit và push..."
    git add .
    git commit -m "chore: Update before deploy $(date '+%Y-%m-%d %H:%M:%S')" || true
fi

echo "⬆️  Pushing latest changes to GitHub (origin/master)..."
git push origin master

# Step 2: Deploy script to execute on VPS
echo ""
echo "🖥️  Step 2: Connecting to VPS and updating web service..."
echo "🔒 CAM KẾT: Giữ nguyên 100% dữ liệu database và file uploads trên VPS."

REMOTE_SCRIPT='
set -e
echo "----------------------------------------------------------"
echo "1. Tìm thư mục MathPlus trên VPS..."
TARGET_DIR=""
for dir in /root/mathplus /root/mathplus-app /var/www/mathplus /home/mathplus; do
    if [ -d "$dir" ] && [ -f "$dir/docker-compose.prod.yml" ]; then
        TARGET_DIR="$dir"
        break
    fi
done

if [ -z "$TARGET_DIR" ]; then
    # Fallback to current directory or clone if first time
    if [ -f "docker-compose.prod.yml" ]; then
        TARGET_DIR="$(pwd)"
    else
        TARGET_DIR="/root/mathplus"
    fi
fi

echo "📁 Thư mục dự án: $TARGET_DIR"
cd "$TARGET_DIR"

echo "2. Kéo code mới nhất từ GitHub..."
git fetch origin master
git reset --hard origin/master

echo "3. Build lại container web (không ảnh hưởng đến DB/Volume)..."
docker compose -f docker-compose.prod.yml build web

echo "4. Khởi động lại container web..."
docker compose -f docker-compose.prod.yml up -d --no-deps web

echo "5. Kiểm tra trạng thái containers..."
docker ps --filter "name=mathplus"

echo "6. Kiểm tra trang /trac-nghiem..."
sleep 3
curl -s -I http://127.0.0.1:3000/trac-nghiem | head -n 5 || true

echo "----------------------------------------------------------"
echo "✅ DEPLOY THÀNH CÔNG TRÊN VPS!"
'

# Execute on remote server via SSH
ssh -o StrictHostKeyChecking=no "$REMOTE" "$REMOTE_SCRIPT"

echo ""
echo "🎉 HOÀN TẤT DEPLOY LÊN VPS!"
