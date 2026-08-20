// Robust High-Quality Vietnamese Speech Engine via Next.js API & Fallbacks

export function normalizeMathSpeech(text: string): string {
  let cleaned = text;

  // Clean math signs and format for natural Vietnamese reading
  cleaned = cleaned.replace(/\?/g, " dấu hỏi chấm ");
  cleaned = cleaned.replace(/\+/g, " cộng ");
  cleaned = cleaned.replace(/[–—−]/g, " trừ ");
  cleaned = cleaned.replace(/\s+-\s+/g, " trừ ");
  cleaned = cleaned.replace(/=/g, " bằng ");
  cleaned = cleaned.replace(/\(/g, " ");
  cleaned = cleaned.replace(/\)/g, " ");
  cleaned = cleaned.replace(/\bx\s*\+/gi, "ích cộng ");
  cleaned = cleaned.replace(/\bx\s*=/gi, "ích bằng ");
  cleaned = cleaned.replace(/biết:\s*x/gi, "biết ích ");
  cleaned = cleaned.replace(/\bx\b/gi, "ích");
  cleaned = cleaned.replace(/6A/gi, "sáu A");
  cleaned = cleaned.replace(/100\s?000/g, "100 nghìn");
  cleaned = cleaned.replace(/6\s?000/g, "6 nghìn");
  cleaned = cleaned.replace(/5\s?000/g, "5 nghìn");
  cleaned = cleaned.replace(/2\s?874/g, "2874");
  cleaned = cleaned.replace(/7\s?869/g, "7869");

  // Remove multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

// Split text into chunks of <= 150 characters on sentence / clause boundaries
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
        // Break long sentence by words
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

      const url = `/api/tts?text=${encodeURIComponent(chunk)}`;
      const audio = new Audio(url);
      this.currentAudio = audio;

      audio.onended = () => {
        if (!this.cancelRequested) {
          playNextChunk();
        }
      };

      audio.onerror = () => {
        // Fallback to Web Speech API if API call fails
        if (!this.cancelRequested) {
          this.speakWithWebSpeech(chunk, () => {
            playNextChunk();
          });
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play blocked, fallback to WebSpeech:", err);
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

  private speakWithWebSpeech(text: string, onFinish: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onFinish();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
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

      if (viVoice) {
        utterance.voice = viVoice;
      }

      utterance.onend = () => onFinish();
      utterance.onerror = () => onFinish();

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      onFinish();
    }
  }
}

export const quizSpeech = new QuizSpeechEngine();
