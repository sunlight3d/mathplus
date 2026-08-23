// Robust High-Quality Vietnamese Speech Engine via Next.js API & Safe Fallbacks

const letterPronunciation: Record<string, string> = {
  A: "A",
  B: "Bê",
  C: "Cê",
  D: "Dê",
  E: "E",
  F: "Ép",
  G: "Gờ",
  H: "Hát",
  I: "I",
  J: "Di",
  K: "Ca",
  L: "E-lờ",
  M: "Em",
  N: "En",
  O: "Ô",
  P: "Pê",
  Q: "Quy",
  R: "E-rờ",
  S: "Ét",
  T: "Tê",
  U: "U",
  V: "Vê",
  W: "Vê kép",
  X: "Ích",
  Y: "Y",
  Z: "Rét"
};

const varMap: Record<string, string> = {
  x: "ích",
  y: "y",
  z: "rét",
  t: "tê",
  u: "u",
  v: "vê",
  a: "a",
  b: "bê",
  c: "cê",
  m: "em",
  n: "en",
  k: "ca",
  p: "pê",
  q: "quy"
};

const expMap: Record<string, string> = {
  "2": "bình phương",
  "3": "mũ ba",
  "4": "mũ bốn",
  "5": "mũ năm",
  "6": "mũ sáu",
  "7": "mũ bảy",
  "8": "mũ tám",
  "9": "mũ chín"
};

export function spellUppercaseLetters(word: string): string {
  return word
    .split("")
    .map((ch) => letterPronunciation[ch.toUpperCase()] || ch)
    .join(" ");
}

function readGroup3(threeDigits: number, isFirstGroup = false): string {
  const units = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const h = Math.floor(threeDigits / 100);
  const t = Math.floor((threeDigits % 100) / 10);
  const u = threeDigits % 10;
  let res = "";

  if (h > 0 || !isFirstGroup) {
    res += units[h] + " trăm ";
  }

  if (t > 1) {
    res += (t === 2 ? "hai" : t === 3 ? "ba" : t === 4 ? "bốn" : t === 5 ? "năm" : t === 6 ? "sáu" : t === 7 ? "bảy" : t === 8 ? "tám" : "chín") + " mươi ";
    if (u === 1) res += "mốt";
    else if (u === 4) res += "tư";
    else if (u === 5) res += "lăm";
    else if (u > 0) res += units[u];
  } else if (t === 1) {
    res += "mười ";
    if (u === 1) res += "một";
    else if (u === 5) res += "lăm";
    else if (u > 0) res += units[u];
  } else if (t === 0 && u > 0) {
    if (h > 0 || !isFirstGroup) res += "linh " + units[u];
    else res += units[u];
  } else if (t === 0 && u === 0 && isFirstGroup && h === 0) {
    res += "không";
  }

  return res.trim();
}

export function vietnameseNumberToWords(n: number | string): string {
  const num = parseInt(String(n), 10);
  if (isNaN(num)) return String(n);
  if (num === 0) return "không";
  if (num < 0) return "âm " + vietnameseNumberToWords(-num);

  const scales = ["", "nghìn", "triệu", "tỷ"];
  let numStr = String(num);
  const groups: number[] = [];
  while (numStr.length > 0) {
    groups.unshift(parseInt(numStr.slice(-3), 10));
    numStr = numStr.slice(0, -3);
  }

  const result: string[] = [];
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    const scaleIndex = groups.length - 1 - i;
    if (g > 0 || groups.length === 1) {
      const gWords = readGroup3(g, i === 0);
      const scaleWord = scales[scaleIndex] || "";
      result.push((gWords + " " + scaleWord).trim());
    }
  }

  return result.join(" ").trim();
}

function decimalPartToWords(decStr: string): string {
  const units = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  if (decStr.startsWith("0")) {
    return decStr.split("").map((d) => units[parseInt(d, 10)] || d).join(" ");
  }
  if (decStr.length <= 2) {
    return vietnameseNumberToWords(parseInt(decStr, 10));
  }
  return decStr.split("").map((d) => units[parseInt(d, 10)] || d).join(" ");
}

/**
 * Format math strings for beautiful UI display (converts ^2, ^3 to superscripts ², ³, removes raw LaTeX tags)
 */
export function formatMathForDisplay(text: string): string {
  if (!text) return "";
  let s = text;

  // Clean raw LaTeX wrapping
  s = s.replace(/\\\((.*?)\\\)/g, "$1");
  s = s.replace(/\\\[(.*?)\\\]/g, "$1");
  s = s.replace(/\$(.*?)\$/g, "$1");

  // Replace common LaTeX symbols
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2");
  s = s.replace(/\\sqrt\{([^}]+)\}/g, "√$1");
  s = s.replace(/\\cdot/g, "·");
  s = s.replace(/\\times/g, "×");
  s = s.replace(/\\pm/g, "±");
  s = s.replace(/\\le/g, "≤");
  s = s.replace(/\\ge/g, "≥");
  s = s.replace(/\\ne/g, "≠");
  s = s.replace(/\\approx/g, "≈");
  s = s.replace(/\\pi/g, "π");
  s = s.replace(/\\alpha/g, "α");
  s = s.replace(/\\beta/g, "β");
  s = s.replace(/\\Delta/g, "Δ");
  s = s.replace(/\\infty/g, "∞");

  // Exponent replacements
  const supers: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "n": "ⁿ", "m": "ᵐ", "x": "ˣ", "y": "ʸ"
  };

  s = s.replace(/\^\{([0-9n+-]+)\}/g, (_m, p1) => {
    return p1.split("").map((c: string) => supers[c] || c).join("");
  });

  s = s.replace(/\^([0-9n+-])/g, (_m, p1) => supers[p1] || ("^" + p1));

  return s;
}

export function normalizeMathSpeech(text: string): string {
  if (!text) return "";
  let s = " " + String(text) + " ";

  // 1. Convert answers "Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"
  s = s.replace(/\b(đáp án|câu|chọn)\s+([A-D])\b/gi, (_m, prefix, key) => {
    return prefix + " " + (letterPronunciation[key.toUpperCase()] || key);
  });

  s = s.replace(/\b([A-D])\s*([,:\-])\s*/g, (_m, key, punct) => {
    return (letterPronunciation[key.toUpperCase()] || key) + " " + punct + " ";
  });

  // 2. Polynomials & Monomials with variables & exponents (5x^2y, -2x^2y, 3xy^2, -xy^2, x^2, y^3, etc.)
  const mathVarExpRegex = /(?<=[^a-zA-ZÀ-ỹ0-9]|^)([+-]?\d+)?((?:[xyztuvabcmnkpqXYZTUVABCMNKPQ](?:\^[0-9]+|²|³)?)+)(?=[^a-zA-ZÀ-ỹ0-9]|$)/g;

  s = s.replace(mathVarExpRegex, (match, coef, vars) => {
    const lower = match.trim().toLowerCase();
    if (["ta", "an", "co", "ra", "va", "la", "ma", "do"].includes(lower) && !vars.includes("^") && !vars.includes("²") && !vars.includes("³")) {
      return match;
    }

    let coefWord = "";
    if (coef) {
      if (coef === "-") coefWord = "trừ ";
      else if (coef === "+") coefWord = "cộng ";
      else {
        coefWord = (coef.startsWith("-") ? "âm " + vietnameseNumberToWords(coef.slice(1)) : vietnameseNumberToWords(coef)) + " ";
      }
    }

    let varWords = "";
    const singleVarRegex = /([a-zA-Z])(?:\^([0-9]+)|²|³)?/g;
    let varMatch;
    while ((varMatch = singleVarRegex.exec(vars)) !== null) {
      const vChar = varMatch[1].toLowerCase();
      const vWord = varMap[vChar] || varMatch[1];
      let expStr = varMatch[2];
      if (varMatch[0].endsWith("²")) expStr = "2";
      if (varMatch[0].endsWith("³")) expStr = "3";

      let expWord = "";
      if (expStr) {
        expWord = expMap[expStr] || ("mũ " + expStr);
      }

      varWords += " " + vWord + (expWord ? " " + expWord : "") + " ";
    }

    return " " + coefWord + varWords + " ";
  });

  // 3. Percentages with Decimals (e.g. 7,5% or 7.5% or 0,75% or 0,05%)
  s = s.replace(/([+-]?\d+)[,.](\d+)\s*%/g, (_m, intPart, decPart) => {
    const intWord = intPart.startsWith("-")
      ? "âm " + vietnameseNumberToWords(intPart.slice(1))
      : vietnameseNumberToWords(intPart);
    return " " + intWord + " phẩy " + decimalPartToWords(decPart) + " phần trăm ";
  });

  // 4. Integer Percentages (e.g. 75% or 750% or 100% or -50%)
  s = s.replace(/([+-]?\d+)\s*%/g, (_m, intPart) => {
    const intWord = intPart.startsWith("-")
      ? "âm " + vietnameseNumberToWords(intPart.slice(1))
      : vietnameseNumberToWords(intPart);
    return " " + intWord + " phần trăm ";
  });

  // 5. Fractions like (-3/4) or -3/4 or 1/12 or 5/6
  s = s.replace(/\(\s*-\s*(\d+)\s*\/\s*(\d+)\s*\)/g, (_m, p1, p2) => " âm " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");
  s = s.replace(/-\s*(\d+)\s*\/\s*(\d+)/g, (_m, p1, p2) => " âm " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");
  s = s.replace(/(\d+)\s*\/\s*(\d+)/g, (_m, p1, p2) => " " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");

  // Fractions with algebraic expressions e.g. (2x + 1)/(x - 3)
  s = s.replace(/\/\s*/g, " trên ");

  // Standalone Decimal numbers like 7,5 or 0,75 or 0,05 or 3,14
  s = s.replace(/\b([+-]?\d+)[,.](\d+)\b/g, (_m, intPart, decPart) => {
    const intWord = intPart.startsWith("-")
      ? "âm " + vietnameseNumberToWords(intPart.slice(1))
      : vietnameseNumberToWords(intPart);
    return " " + intWord + " phẩy " + decimalPartToWords(decPart) + " ";
  });

  // Negative numbers in parens like (-3) or (-5)
  s = s.replace(/\(\s*-\s*(\d+)\s*\)/g, (_m, p1) => " âm " + vietnameseNumberToWords(p1) + " ");

  // Standalone isolated integers in option text e.g. "đáp án Bê : 12" -> "đáp án Bê : mười hai"
  s = s.replace(/:\s*([+-]?\d+)\s*$/g, (_m, num) => ": " + vietnameseNumberToWords(num));
  s = s.replace(/:\s*([+-]?\d+)\s+([a-zA-ZÀ-ỹ])/g, (_m, num, nextWord) => ": " + vietnameseNumberToWords(num) + " " + nextWord);

  // 6. LaTeX & Geometry symbol replacements
  s = s.replace(/\\\((.*?)\\\)/g, " $1 ");
  s = s.replace(/\\\[(.*?)\\\]/g, " $1 ");
  s = s.replace(/\$(.*?)\$/g, " $1 ");
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, " $1 phần $2 ");
  s = s.replace(/\\sqrt\{([^}]+)\}/g, " căn bậc hai của $1 ");
  s = s.replace(/\\sqrt\[3\]\{([^}]+)\}/g, " căn bậc ba của $1 ");
  s = s.replace(/\\cdot/g, " nhân ");
  s = s.replace(/\\times/g, " nhân ");
  s = s.replace(/\\pm/g, " cộng trừ ");
  s = s.replace(/\\perp|⊥/g, " vuông góc với ");
  s = s.replace(/\\parallel|∥/g, " song song với ");
  s = s.replace(/\\sim|∽/g, " đồng dạng với ");
  s = s.replace(/\\equiv|≡/g, " tương đương với ");
  s = s.replace(/\\approx|≈/g, " xấp xỉ ");
  s = s.replace(/\\le|≤/g, " bé hơn hoặc bằng ");
  s = s.replace(/\\ge|≥/g, " lớn hơn hoặc bằng ");
  s = s.replace(/\\ne|≠/g, " khác ");
  s = s.replace(/\\in|∈/g, " thuộc ");
  s = s.replace(/\\notin|∉/g, " không thuộc ");
  s = s.replace(/\\subset|⊂/g, " tập con của ");
  s = s.replace(/\\cup|∪/g, " hợp ");
  s = s.replace(/\\cap|∩/g, " giao ");
  s = s.replace(/\\emptyset|∅/g, " tập hợp rỗng ");
  s = s.replace(/\\infty|∞/g, " vô cùng ");
  s = s.replace(/\\pi|π/g, " pi ");
  s = s.replace(/\\alpha|α/g, " an-pha ");
  s = s.replace(/\\beta|β/g, " bê-ta ");
  s = s.replace(/\\Delta|Δ/g, " đen-ta ");
  s = s.replace(/\\delta|δ/g, " đen-ta ");

  // 7. Multi-letter uppercase tokens (AB, AH, ABC, ABCD, MNP, SA, SB, SH, SO...)
  s = s.replace(/\b([A-Z]{2,6})\b/g, (_m, word) => {
    if (word === "OXYZ") return "Ô ích y rét";
    if (word === "OXY") return "Ô ích y";
    if (word === "MATHPLUS" || word === "GDPT" || word === "THPT" || word === "VAT") return word;
    return spellUppercaseLetters(word);
  });

  // 8. Geometry prefix + Single uppercase letter / Polygon name
  s = s.replace(/\b(đa thức|đơn thức|tam giác|tứ giác|hình chóp|đoạn thẳng|đường thẳng|đường cao|trung tuyến|phân giác|vectơ|vector|cạnh|góc|điểm|tâm|mặt phẳng|mặt cầu)\s+([A-Z])\b/gi, (_m, prefix, letter) => {
    return prefix + " " + (letterPronunciation[letter.toUpperCase()] || letter);
  });

  // 9. Single uppercase letter followed by equal sign e.g. "A =" -> "A bằng"
  s = s.replace(/\b([A-Z])\s*=\s*/g, (_m, letter) => {
    return (letterPronunciation[letter.toUpperCase()] || letter) + " bằng ";
  });

  // 10. Roots
  s = s.replace(/√(\d+)/g, (_m, p1) => " căn " + vietnameseNumberToWords(p1) + " ");
  s = s.replace(/√([a-zA-Z])/g, " căn $1 ");

  // 11. Coordinate systems
  s = s.replace(/\bOxyz\b/gi, " Ô ích y rét ");
  s = s.replace(/\bOxy\b/gi, " Ô ích y ");

  // 12. Math symbols
  s = s.replace(/\?/g, " ? ");
  s = s.replace(/\+/g, " cộng ");
  s = s.replace(/[–—−]/g, " trừ ");
  s = s.replace(/\s+-\s+/g, " trừ ");
  s = s.replace(/\s*=\s*/g, " bằng ");
  s = s.replace(/\s*≠\s*/g, " khác ");
  s = s.replace(/\s*<\s*/g, " nhỏ hơn ");
  s = s.replace(/\s*>\s*/g, " lớn hơn ");
  s = s.replace(/\s*≤\s*/g, " nhỏ hơn hoặc bằng ");
  s = s.replace(/\s*≥\s*/g, " lớn hơn hoặc bằng ");
  s = s.replace(/\s*%\s*/g, " phần trăm ");
  s = s.replace(/\s*°\s*/g, " độ ");

  // Common abbreviations & classes
  s = s.replace(/6A/gi, "sáu A");
  s = s.replace(/7A/gi, "bảy A");
  s = s.replace(/8A/gi, "tám A");
  s = s.replace(/9A/gi, "chín A");

  // 13. Convert remaining standalone digits around math operators to Vietnamese
  s = s.replace(/(?<=\b(?:cộng|trừ|bằng|nhân|chia|mũ)\s+)(\d+)\b/g, (_m, num) => {
    return vietnameseNumberToWords(num);
  });

  // 14. Clean brackets and spacing
  s = s.replace(/[(){}\[\]]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// Split text into chunks of <= 140 characters on sentence / clause boundaries
function splitTextIntoChunks(text: string, maxLen = 140): string[] {
  if (text.length <= maxLen) return [text];

  const sentences = text.split(/(?<=[.,!?;:\n])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const s of sentences) {
    if ((current + " " + s).trim().length <= maxLen) {
      current = (current + " " + s).trim();
    } else {
      if (current) chunks.push(current);
      if (s.length <= maxLen) {
        current = s;
      } else {
        const words = s.split(" ");
        let sub = "";
        for (const w of words) {
          if ((sub + " " + w).trim().length <= maxLen) {
            sub = (sub + " " + w).trim();
          } else {
            if (sub) chunks.push(sub);
            sub = w;
          }
        }
        current = sub;
      }
    }
  }

  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [text];
}

class QuizSpeechEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private cancelRequested = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
  }

  public stop() {
    this.cancelRequested = true;
    this.isPlaying = false;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = "";
      } catch (e) {}
      this.currentAudio = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  public speak(
    rawText: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    this.stop();
    this.cancelRequested = false;
    this.isPlaying = true;

    if (typeof window === "undefined") {
      if (onEnd) onEnd();
      return;
    }

    const spokenText = normalizeMathSpeech(rawText);
    const chunks = splitTextIntoChunks(spokenText);

    if (onStart) onStart();

    let chunkIndex = 0;

    const playNextChunk = () => {
      if (this.cancelRequested || chunkIndex >= chunks.length) {
        this.isPlaying = false;
        if (!this.cancelRequested && onEnd) {
          onEnd();
        }
        return;
      }

      const chunk = chunks[chunkIndex];
      chunkIndex++;

      // Primary Engine: Next.js API Vietnamese TTS
      const url = `/api/tts?text=${encodeURIComponent(chunk)}`;
      const audio = new Audio();
      this.currentAudio = audio;

      audio.onended = () => {
        if (!this.cancelRequested) {
          playNextChunk();
        }
      };

      audio.onerror = () => {
        // Fallback to Web Speech API ONLY IF a Vietnamese voice is available
        if (!this.cancelRequested) {
          this.speakWithWebSpeech(chunk, () => {
            playNextChunk();
          });
        }
      };

      audio.src = url;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play blocked or network error, checking Vietnamese voice fallback:", err);
          if (!this.cancelRequested) {
            this.speakWithWebSpeech(chunk, () => {
              playNextChunk();
            });
          }
        });
      }
    };

    playNextChunk();
  }

  /**
   * Only use WebSpeech API if a native Vietnamese voice exists on the client.
   * If only English/Foreign voices exist, NEVER use English to read Vietnamese!
   */
  private speakWithWebSpeech(text: string, onFinish: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onFinish();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
      const viVoice = voices.find(
        (v) =>
          v.lang === "vi-VN" ||
          v.lang === "vi_VN" ||
          v.lang.toLowerCase().startsWith("vi") ||
          v.name.toLowerCase().includes("vietnam") ||
          v.name.toLowerCase().includes("vietnamese") ||
          v.name.toLowerCase().includes("linh") ||
          v.name.toLowerCase().includes("mai") ||
          v.name.toLowerCase().includes("an")
      );

      // CRITICAL: If no Vietnamese voice is installed on user's OS, DO NOT speak with English voice!
      if (!viVoice) {
        console.warn("No native Vietnamese voice found in browser, skipping English voice fallback.");
        onFinish();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = viVoice;
      utterance.lang = "vi-VN";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => onFinish();
      utterance.onerror = () => onFinish();

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      onFinish();
    }
  }
}

export const quizSpeech = new QuizSpeechEngine();
