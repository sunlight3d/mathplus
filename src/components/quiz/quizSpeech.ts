// Robust High-Quality Vietnamese Speech Engine via Next.js API & Safe Fallbacks

function vietnameseNumberToWords(n: number | string): string {
  const units = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const num = parseInt(String(n), 10);
  if (isNaN(num)) return String(n);
  if (num < 0) return "âm " + vietnameseNumberToWords(-num);
  if (num < 10) return units[num];
  if (num === 10) return "mười";
  if (num < 20) {
    const unit = num % 10;
    if (unit === 5) return "mười lăm";
    if (unit === 1) return "mười một";
    return "mười " + units[unit];
  }
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    let s = (ten === 2 ? "hai" : ten === 3 ? "ba" : ten === 4 ? "bốn" : ten === 5 ? "năm" : ten === 6 ? "sáu" : ten === 7 ? "bảy" : ten === 8 ? "tám" : "chín") + " mươi";
    if (unit === 1) s += " mốt";
    else if (unit === 4) s += " tư";
    else if (unit === 5) s += " lăm";
    else if (unit > 0) s += " " + units[unit];
    return s;
  }
  return String(n);
}

export function normalizeMathSpeech(text: string): string {
  if (!text) return "";
  let s = " " + String(text) + " ";

  // 1. LaTeX & Formula cleanup
  s = s.replace(/\\\((.*?)\\\)/g, " $1 ");
  s = s.replace(/\\\[(.*?)\\\]/g, " $1 ");
  s = s.replace(/\$(.*?)\$/g, " $1 ");
  s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, " $1 phần $2 ");
  s = s.replace(/\\sqrt\{([^}]+)\}/g, " căn bậc hai của $1 ");
  s = s.replace(/\\sqrt\[3\]\{([^}]+)\}/g, " căn bậc ba của $1 ");
  s = s.replace(/\\cdot/g, " nhân ");
  s = s.replace(/\\times/g, " nhân ");
  s = s.replace(/\\pm/g, " cộng trừ ");
  s = s.replace(/\\le/g, " bé hơn hoặc bằng ");
  s = s.replace(/\\ge/g, " lớn hơn hoặc bằng ");
  s = s.replace(/\\ne/g, " khác ");
  s = s.replace(/\\in/g, " thuộc ");
  s = s.replace(/\\notin/g, " không thuộc ");
  s = s.replace(/\\subset/g, " tập con của ");
  s = s.replace(/\\cup/g, " hợp ");
  s = s.replace(/\\cap/g, " giao ");
  s = s.replace(/\\infty/g, " vô cùng ");
  s = s.replace(/\\pi/g, " pi ");
  s = s.replace(/\\alpha/g, " an-pha ");
  s = s.replace(/\\beta/g, " bê-ta ");
  s = s.replace(/\\Delta/g, " đen-ta ");
  s = s.replace(/\\delta/g, " đen-ta ");

  // 2. Fractions like (-3/4) or -3/4 or 1/12 or 5/6
  s = s.replace(/\(\s*-\s*(\d+)\s*\/\s*(\d+)\s*\)/g, (_m, p1, p2) => " âm " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");
  s = s.replace(/-\s*(\d+)\s*\/\s*(\d+)/g, (_m, p1, p2) => " âm " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");
  s = s.replace(/(\d+)\s*\/\s*(\d+)/g, (_m, p1, p2) => " " + vietnameseNumberToWords(p1) + " phần " + vietnameseNumberToWords(p2) + " ");

  // Fractions with algebraic expressions e.g. (2x + 1)/(x - 3)
  s = s.replace(/\/\s*/g, " trên ");

  // Negative numbers like (-3) or (-5)
  s = s.replace(/\(\s*-\s*(\d+)\s*\)/g, (_m, p1) => " âm " + vietnameseNumberToWords(p1) + " ");

  // Single numbers in options like "đáp án B, 2"
  s = s.replace(/\b([A-D])\s*,\s*([+-]?\d+)\b/gi, (_m, p1, p2) => p1 + ", " + vietnameseNumberToWords(p2));

  // 3. Powers and Exponents
  s = s.replace(/([a-zA-Z0-9]+)\^2\b/g, "$1 bình phương");
  s = s.replace(/([a-zA-Z0-9]+)²/g, "$1 bình phương");
  s = s.replace(/([a-zA-Z0-9]+)\^3\b/g, "$1 mũ ba");
  s = s.replace(/([a-zA-Z0-9]+)³/g, "$1 mũ ba");
  s = s.replace(/([a-zA-Z0-9]+)\^([0-9]+)/g, "$1 mũ $2");

  // 4. Roots
  s = s.replace(/√(\d+)/g, (_m, p1) => " căn " + vietnameseNumberToWords(p1) + " ");
  s = s.replace(/√([a-zA-Z])/g, " căn $1 ");

  // 5. Coordinate systems
  s = s.replace(/\bOxyz\b/gi, " Ô ích y rét ");
  s = s.replace(/\bOxy\b/gi, " Ô ích y ");

  // 6. Variables x, y, z phonetics in Vietnamese
  s = s.replace(/(\d+)\s*x\b/gi, "$1 ích");
  s = s.replace(/\bx\s*\+/gi, "ích cộng ");
  s = s.replace(/\bx\s*-/gi, "ích trừ ");
  s = s.replace(/\bx\s*=/gi, "ích bằng ");
  s = s.replace(/\s+x\s+/gi, " ích ");

  s = s.replace(/(\d+)\s*y\b/gi, "$1 y");
  s = s.replace(/\by\s*\+/gi, "y cộng ");
  s = s.replace(/\by\s*-/gi, "y trừ ");
  s = s.replace(/\by\s*=/gi, "y bằng ");
  s = s.replace(/\s+y\s+/gi, " y ");

  s = s.replace(/(\d+)\s*z\b/gi, "$1 rét");
  s = s.replace(/\bz\s*\+/gi, "rét cộng ");
  s = s.replace(/\bz\s*-/gi, "rét trừ ");
  s = s.replace(/\bz\s*=/gi, "rét bằng ");
  s = s.replace(/\s+z\s+/gi, " rét ");

  // 7. Math symbols
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

  // 8. Clean brackets and spacing
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
