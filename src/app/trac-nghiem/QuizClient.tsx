"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  Trophy,
  Lightbulb,
  ListOrdered,
  Calculator,
  Compass,
  Shuffle,
  GraduationCap,
  Loader2,
  BookOpen,
  Check
} from "lucide-react";
import BurningFuse from "@/components/quiz/BurningFuse";
import { quizAudio } from "@/components/quiz/quizAudio";
import { quizSpeech } from "@/components/quiz/quizSpeech";
import {
  defaultMathQuizQuestions,
  getDefaultQuestionsForGrade,
  GRADES,
  QuizQuestion,
  GradeItem
} from "@/components/quiz/quizData";

export default function QuizClient() {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [questions, setQuestions] = useState<QuizQuestion[]>(defaultMathQuizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"IDLE" | "READING_QUESTION" | "COUNTDOWN" | "REVEALED">("IDLE");
  const [totalDuration, setTotalDuration] = useState(10); // default 10s (8 - 12s)
  const [timeLeft, setTimeLeft] = useState(10);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});

  // Loading state for DB fetch
  const [isLoadingDB, setIsLoadingDB] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ: QuizQuestion = questions[currentIndex] || defaultMathQuizQuestions[0];

  // Synchronize sound effects state
  useEffect(() => {
    quizAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Clean speech synthesis, audio and timers
  const stopAllAudioAndTimers = useCallback(() => {
    quizSpeech.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoNextRef.current) clearTimeout(autoNextRef.current);
  }, []);

  // Show auto-dismiss notification toast
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Reset quiz state when new questions are loaded
  const resetQuizState = (newQuestions: QuizQuestion[]) => {
    stopAllAudioAndTimers();
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setUserAnswers({});
    setSelectedOption(null);
    setQuizStatus("IDLE");
    setTimeLeft(totalDuration);
  };

  // Fetch questions by grade from Database
  const fetchQuestionsFromDB = async (grade: number) => {
    setIsLoadingDB(true);
    stopAllAudioAndTimers();
    try {
      const res = await fetch(`/api/quiz/questions?grade=${grade}&limit=10`);
      const data = await res.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        resetQuizState(data.questions);
        showToast(`Đã chọn ngẫu nhiên 10 câu hỏi Toán Lớp ${grade} chuẩn khung chương trình!`, "info");
      } else {
        const fallback = getDefaultQuestionsForGrade(grade);
        resetQuizState(fallback);
      }
    } catch (err) {
      console.error("Error fetching questions from DB:", err);
      const fallback = getDefaultQuestionsForGrade(grade);
      resetQuizState(fallback);
    } finally {
      setIsLoadingDB(false);
    }
  };

  // Handle grade change
  const handleGradeChange = (grade: number) => {
    if (grade === selectedGrade && questions.length > 0) return;
    setSelectedGrade(grade);
    fetchQuestionsFromDB(grade);
  };

  // Start the countdown timer after speech finishes
  const startCountdown = useCallback(() => {
    setQuizStatus("COUNTDOWN");
    setTimeLeft(totalDuration);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }

        if (prev <= 4) {
          quizAudio.playUrgentTick();
        } else {
          quizAudio.playTick();
        }

        return prev - 1;
      });
    }, 1000);
  }, [totalDuration]);

  // Time is up handler
  const handleTimeUp = useCallback(() => {
    setQuizStatus("REVEALED");
    quizAudio.playTimeUp();

    const correct = currentQ.correctAnswer;
    const correctOpt = currentQ.options.find((o) => o.key === correct);
    const answerSpeechText = `Hết giờ rồi! Đáp án chính xác là đáp án ${correct}: ${correctOpt?.text || ""}`;

    if (ttsEnabled) {
      quizSpeech.speak(
        answerSpeechText,
        () => {},
        () => {
          if (autoAdvance && currentIndex < questions.length - 1) {
            autoNextRef.current = setTimeout(() => {
              goToNextQuestion();
            }, 3500);
          }
        }
      );
    }
  }, [currentQ, ttsEnabled, autoAdvance, currentIndex, questions.length]);

  // Play question: Speak aloud in Vietnamese -> then start countdown
  const playCurrentQuestion = useCallback(() => {
    stopAllAudioAndTimers();
    setSelectedOption(userAnswers[currentQ.id]?.selected || null);
    setQuizStatus("READING_QUESTION");
    setTimeLeft(totalDuration);

    const questionSpeech = `Câu hỏi số ${currentIndex + 1}. ${currentQ.question}`;

    if (ttsEnabled) {
      quizSpeech.speak(
        questionSpeech,
        () => {},
        () => {
          startCountdown();
        }
      );
    } else {
      startCountdown();
    }
  }, [currentQ, currentIndex, totalDuration, ttsEnabled, stopAllAudioAndTimers, startCountdown, userAnswers]);

  // Option selection
  const handleSelectOption = (key: string) => {
    if (quizStatus === "REVEALED") return;

    stopAllAudioAndTimers();
    setSelectedOption(key);
    setQuizStatus("REVEALED");

    const isCorrect = key === currentQ.correctAnswer;
    if (isCorrect) {
      quizAudio.playCorrect();
      setScore((s) => s + 1);
    } else {
      quizAudio.playWrong();
    }
    setAnsweredCount((c) => c + 1);

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { selected: key, isCorrect },
    }));

    const correct = currentQ.correctAnswer;
    const correctOpt = currentQ.options.find((o) => o.key === correct);
    const feedbackSpeech = isCorrect
      ? `Chúc mừng bạn đã trả lời chính xác! Đáp án đúng là đáp án ${correct}: ${correctOpt?.text || ""}`
      : `Rất tiếc chưa chính xác! Đáp án đúng là đáp án ${correct}: ${correctOpt?.text || ""}`;

    if (ttsEnabled) {
      quizSpeech.speak(
        feedbackSpeech,
        () => {},
        () => {
          if (autoAdvance && currentIndex < questions.length - 1) {
            autoNextRef.current = setTimeout(() => {
              goToNextQuestion();
            }, 3500);
          }
        }
      );
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const restartQuiz = () => {
    stopAllAudioAndTimers();
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setUserAnswers({});
    setSelectedOption(null);
    setQuizStatus("IDLE");
  };

  // Initial load
  useEffect(() => {
    fetchQuestionsFromDB(6);
  }, []);

  useEffect(() => {
    if (quizStatus !== "IDLE") {
      playCurrentQuestion();
    }
    return () => {
      stopAllAudioAndTimers();
    };
  }, [currentIndex]);

  const isBurning = quizStatus === "COUNTDOWN";
  const isTimeUp = quizStatus === "REVEALED" && timeLeft === 0 && !selectedOption;
  const isAnswerRevealed = quizStatus === "REVEALED";
  const currentGradeInfo = GRADES.find((g) => g.id === selectedGrade) || GRADES[0];

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-20 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 text-sm font-bold animate-bounce border-2 ${
          notification.type === "success"
            ? "bg-[#2e5311] border-[#FFB800] text-white"
            : notification.type === "info"
            ? "bg-[#1b310a] border-[#64B428] text-white"
            : "bg-red-600 border-red-300 text-white"
        }`}>
          {notification.type === "success" ? <Sparkles className="w-5 h-5 text-[#FFB800]" /> : <BookOpen className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Controls Toolbar with MathPlus Green Palette */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#2e5311]/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border-2 border-[#64B428]/40 mb-6 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#64B428] to-[#FFB800] flex items-center justify-center shadow-md">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FFB800]">Thực hành trực tuyến</span>
              <span className="text-[10px] bg-[#64B428] text-white px-2 py-0.5 rounded-full font-bold">
                {currentGradeInfo.label}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">MathPlus Quick Quiz</h2>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Time Selector */}
          <div className="flex items-center bg-black/40 rounded-xl px-2.5 py-1.5 border border-[#64B428]/30 text-xs text-white">
            <span className="mr-1.5 text-gray-300 font-medium">Đếm lùi:</span>
            {[8, 10, 12].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setTotalDuration(sec);
                  if (quizStatus === "COUNTDOWN" || quizStatus === "IDLE") {
                    setTimeLeft(sec);
                  }
                }}
                className={`px-2.5 py-1 mx-0.5 rounded-lg font-black transition-all ${
                  totalDuration === sec
                    ? "bg-[#64B428] text-white shadow-md scale-105"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>

          {/* Voice Speech Toggle */}
          <button
            onClick={() => {
              if (ttsEnabled) {
                quizSpeech.stop();
              }
              setTtsEnabled(!ttsEnabled);
            }}
            title={ttsEnabled ? "Tắt đọc tiếng Việt" : "Bật đọc tiếng Việt"}
            className={`p-2.5 rounded-xl border-2 transition-all flex items-center space-x-1.5 text-xs font-bold ${
              ttsEnabled
                ? "bg-[#FFB800]/20 border-[#FFB800] text-[#FFB800] shadow-md"
                : "bg-white/5 border-white/20 text-gray-400"
            }`}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4 text-[#FFB800]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{ttsEnabled ? "Giọng đọc: BẬT" : "Giọng đọc: TẮT"}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Tắt âm thanh hiệu ứng" : "Bật âm thanh hiệu ứng"}
            className={`p-2.5 rounded-xl border-2 transition-all ${
              soundEnabled
                ? "bg-[#64B428]/20 border-[#64B428] text-green-300 shadow-md"
                : "bg-white/5 border-white/20 text-gray-400"
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TikTok / Phone Card Quiz Frame (Styled with MathPlus Green & Gold) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[430px] rounded-[36px] bg-gradient-to-b from-[#E8F8E0] via-[#F4FCF0] to-[#E2F5D7] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-4 border-[#64B428] relative overflow-hidden text-gray-900">
            
            {/* Loading Overlay during Question Fetch */}
            {isLoadingDB && (
              <div className="absolute inset-0 bg-[#1b310a]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center text-white animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#64B428] to-[#FFB800] flex items-center justify-center mb-4 shadow-xl">
                  <Shuffle className="w-8 h-8 text-[#1b310a] animate-spin" />
                </div>
                <h4 className="text-lg font-black text-[#FFB800] mb-2">Đang tải đề Toán Lớp {selectedGrade}...</h4>
                <p className="text-xs text-gray-200 leading-relaxed max-w-xs mb-3">
                  Trích xuất ngẫu nhiên 10 câu hỏi chuẩn theo khung chương trình GDPT.
                </p>
                <div className="flex items-center space-x-2 text-xs text-[#64B428] font-bold bg-black/40 px-3 py-1.5 rounded-full">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Vui lòng chờ giây lát...</span>
                </div>
              </div>
            )}

            {/* Math Grid Paper Texture on Card */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #64B428 1px, transparent 1px),
                  linear-gradient(to bottom, #64B428 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Subtle Math Formulas floating inside Card */}
            <div className="absolute top-8 right-4 text-[#64B428]/15 font-mono font-bold text-xl pointer-events-none select-none">
              √x² + y²
            </div>
            <div className="absolute bottom-16 left-4 text-[#FFB800]/20 font-serif font-black text-2xl pointer-events-none select-none">
              πr²
            </div>

            {/* Header Badge on Phone Screen */}
            <div className="relative z-10 flex items-center justify-between mb-3">
              <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-[#64B428]/40 flex items-center space-x-2 text-xs font-black text-[#2e5311]">
                <Image
                  src="/images/logo.jpg"
                  alt="MathPlus"
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover border border-[#64B428]"
                />
                <span>CÂU {currentIndex + 1} / {questions.length}</span>
              </div>
              
              <div className="bg-[#2e5311] px-3.5 py-1.5 rounded-full shadow-md text-[11px] font-black text-[#FFB800] uppercase tracking-wide border border-[#FFB800]/40">
                {currentQ.topic || `TOÁN LỚP ${selectedGrade}`}
              </div>
            </div>

            {/* Math Mascot & Central Illustration Frame */}
            <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-md border-2 border-[#FFB800] mb-3 text-center">
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#64B428]/20 via-[#FFB800]/20 to-emerald-100 p-1.5 shadow-inner border-2 border-[#64B428] flex items-center justify-center">
                <span className="text-5xl sm:text-6xl filter drop-shadow-md select-none animate-bounce">
                  {currentQ.iconType || currentGradeInfo.icon}
                </span>
                
                {/* Purple/Green Countdown Badge */}
                <div className={`absolute -left-3 -top-2 w-9 h-9 rounded-full border-2 border-white text-white font-black text-sm flex items-center justify-center shadow-lg transition-all ${
                  quizStatus === "COUNTDOWN" && timeLeft <= 3
                    ? "bg-red-500 scale-110 animate-ping"
                    : "bg-[#2e5311]"
                }`}>
                  {quizStatus === "COUNTDOWN" ? timeLeft : currentIndex + 1}
                </div>
              </div>

              <div className="mt-2 text-[11px] font-black text-[#2e5311] uppercase tracking-widest flex items-center justify-center space-x-1">
                <span>HỎI ĐÁP TOÁN LỚP {selectedGrade} • MATHPLUS</span>
              </div>
            </div>

            {/* The Question Text Box */}
            <div className="relative z-10 bg-[#FFFDF5] border-2 border-[#FFB800]/70 rounded-2xl p-4 shadow-md mb-3">
              <p className="text-sm sm:text-base font-black text-[#1b310a] leading-relaxed text-center">
                {currentQ.question}
              </p>

              {quizStatus === "READING_QUESTION" && (
                <div className="mt-2.5 flex items-center justify-center space-x-2 text-xs text-[#2e5311] font-black animate-pulse bg-[#64B428]/20 py-1.5 px-3 rounded-full mx-auto w-fit border border-[#64B428]/30">
                  <Volume2 className="w-4 h-4 text-[#64B428] animate-bounce" />
                  <span>🔊 Đang đọc câu hỏi tiếng Việt...</span>
                  <span className="text-sm">🎵</span>
                </div>
              )}
            </div>

            {/* Burning Fuse Wire Animation */}
            <div className="relative z-10 bg-white/95 rounded-2xl p-1 shadow-sm border border-[#64B428]/30 mb-3">
              <BurningFuse
                timeLeft={timeLeft}
                totalTime={totalDuration}
                isBurning={isBurning}
                isTimeUp={isTimeUp}
              />
            </div>

            {/* Options List */}
            <div className="relative z-10 space-y-2.5 mb-4">
              {currentQ.options && currentQ.options.map((option) => {
                const isSelected = selectedOption === option.key;
                const isCorrect = isAnswerRevealed && option.key === currentQ.correctAnswer;
                const isWrongSelected = isAnswerRevealed && isSelected && !isCorrect;

                let buttonStyles = "bg-white hover:bg-[#F2FBF0] text-[#1b310a] border-2 border-[#64B428]/30 shadow-sm hover:border-[#64B428]";

                if (isCorrect) {
                  buttonStyles = "bg-gradient-to-r from-[#64B428] to-[#458517] text-white border-2 border-[#FFB800] shadow-lg scale-[1.02] font-black";
                } else if (isWrongSelected) {
                  buttonStyles = "bg-red-500 text-white border-2 border-red-300 shadow-md font-bold";
                } else if (isAnswerRevealed) {
                  buttonStyles = "bg-gray-100 text-gray-400 border border-gray-200 opacity-60";
                }

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(option.key)}
                    disabled={isAnswerRevealed}
                    className={`w-full py-3 px-4 rounded-full flex items-center justify-between text-left text-sm sm:text-base font-bold transition-all duration-200 active:scale-95 ${buttonStyles}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-inner ${
                        isCorrect
                          ? "bg-[#FFB800] text-[#2e5311]"
                          : isWrongSelected
                          ? "bg-white text-red-600"
                          : "bg-[#2e5311] text-[#FFB800]"
                      }`}>
                        {option.key}
                      </span>
                      <span className="text-[15px] font-extrabold">{option.text}</span>
                    </div>

                    {isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-[#FFB800] drop-shadow animate-bounce" />
                    )}
                    {isWrongSelected && (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="relative z-10 pt-2 border-t border-[#64B428]/30 flex items-center justify-between gap-2">
              {quizStatus === "IDLE" ? (
                <button
                  onClick={playCurrentQuestion}
                  className="w-full py-3.5 bg-gradient-to-r from-[#64B428] via-[#509020] to-[#2e5311] hover:brightness-110 text-white rounded-full font-black text-base shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2 border-2 border-[#FFB800]"
                >
                  <Play className="w-5 h-5 fill-white text-white" />
                  <span>BẮT ĐẦU ĐỐ VUI TOÁN LỚP {selectedGrade}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={playCurrentQuestion}
                    className="px-3.5 py-2 bg-white hover:bg-gray-50 text-[#2e5311] rounded-full font-black text-xs shadow-sm border border-[#64B428]/50 flex items-center space-x-1 transition-all"
                    title="Đọc lại câu hỏi & đếm ngược"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đọc lại</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPrevQuestion}
                      disabled={currentIndex === 0}
                      className="p-2 bg-white hover:bg-gray-50 disabled:opacity-40 text-[#2e5311] rounded-full font-bold shadow-sm border border-[#64B428]/40 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={goToNextQuestion}
                      disabled={currentIndex === questions.length - 1}
                      className="px-4 py-2 bg-[#64B428] hover:bg-[#509020] disabled:opacity-40 text-white rounded-full font-black text-xs shadow-md transition-all flex items-center space-x-1"
                    >
                      <span>Câu tiếp</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Channel Signature */}
            <div className="relative z-10 mt-3 pt-2 text-center text-[11px] text-[#2e5311] font-semibold">
              <span className="font-black text-[#2e5311]">MathPlus Academy</span> • Học Toán Chủ Động #MathPlus #Lop{selectedGrade}
            </div>
          </div>
        </div>

        {/* Right Column: Grade Selector, Actions, Score, Solutions */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Grade Selector Card */}
          <div className="bg-[#2e5311]/95 backdrop-blur-md rounded-3xl p-5 border-2 border-[#64B428]/40 shadow-xl text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-[#FFB800] uppercase tracking-wider flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" /> Chọn Lớp Học
              </h3>
              <span className="text-xs bg-[#64B428] text-white px-2.5 py-0.5 rounded-full font-bold">
                {currentGradeInfo.label}
              </span>
            </div>

            {/* Grid of Grades 6 to 12 */}
            <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 gap-2 mb-4">
              {GRADES.map((g) => {
                const isSelected = g.id === selectedGrade;
                return (
                  <button
                    key={g.id}
                    onClick={() => handleGradeChange(g.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center border-2 ${
                      isSelected
                        ? "bg-gradient-to-tr from-[#64B428] to-[#FFB800] text-[#1b310a] border-white shadow-lg scale-105"
                        : "bg-black/30 hover:bg-black/50 text-gray-200 border-[#64B428]/30"
                    }`}
                  >
                    <span className="text-sm">{g.icon}</span>
                    <span>{g.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action: Random 10 Questions */}
            <div className="pt-3 border-t border-[#64B428]/30">
              <button
                onClick={() => fetchQuestionsFromDB(selectedGrade)}
                disabled={isLoadingDB}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#64B428] via-[#509020] to-[#2e5311] hover:brightness-110 border-2 border-[#FFB800] text-white rounded-2xl text-sm font-black shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isLoadingDB ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#FFB800]" />
                ) : (
                  <Shuffle className="w-5 h-5 text-[#FFB800]" />
                )}
                <span>🎲 Đổi 10 câu hỏi ngẫu nhiên (Lớp {selectedGrade})</span>
              </button>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-[#2e5311]/90 backdrop-blur-md rounded-3xl p-5 border-2 border-[#64B428]/40 shadow-xl text-white">
            <h3 className="text-sm font-black text-[#FFB800] uppercase tracking-wider mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-2" /> Kết quả thử thách ({currentGradeInfo.label})
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black/30 rounded-2xl p-3.5 text-center border border-[#64B428]/30">
                <div className="text-3xl font-black text-[#64B428]">{score}</div>
                <div className="text-xs text-gray-300 font-bold mt-1">Câu trả lời đúng</div>
              </div>
              <div className="bg-black/30 rounded-2xl p-3.5 text-center border border-[#FFB800]/30">
                <div className="text-3xl font-black text-[#FFB800]">{answeredCount} / {questions.length}</div>
                <div className="text-xs text-gray-300 font-bold mt-1">Đã hoàn thành</div>
              </div>
            </div>

            {/* Progress bar with MathPlus styling */}
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden p-0.5 border border-[#64B428]/30 mb-2.5">
              <div
                className="bg-gradient-to-r from-[#FFB800] to-[#64B428] h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${(answeredCount / (questions.length || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="font-semibold">Tiến độ: {Math.round((answeredCount / (questions.length || 1)) * 100)}%</span>
              <button
                onClick={restartQuiz}
                className="text-[#FFB800] hover:text-amber-200 underline font-black"
              >
                Làm lại từ đầu
              </button>
            </div>
          </div>

          {/* Step-by-Step Math Solution Card */}
          {isAnswerRevealed && (
            <div className="bg-gradient-to-br from-[#1b310a] to-[#2e5311] backdrop-blur-md rounded-3xl p-5 border-2 border-[#FFB800] shadow-2xl text-white animate-fade-in">
              <div className="flex items-center space-x-2 text-[#FFB800] font-black text-sm mb-3">
                <Lightbulb className="w-5 h-5 text-[#FFB800] animate-bounce" />
                <span>HƯỚNG DẪN GIẢI CHI TIẾT CÂU {currentIndex + 1}</span>
              </div>
              <div className="text-sm text-green-50 leading-relaxed font-medium bg-black/40 p-4 rounded-2xl border border-[#64B428]/40 shadow-inner">
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Quick Jump Selector Grid */}
          <div className="bg-[#2e5311]/90 backdrop-blur-md rounded-3xl p-5 border-2 border-[#64B428]/40 shadow-xl text-white">
            <h3 className="text-sm font-black text-[#FFB800] uppercase tracking-wider mb-3 flex items-center">
              <ListOrdered className="w-4 h-4 mr-2" /> Chọn nhanh câu hỏi
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const state = userAnswers[q.id];
                const isCurrent = idx === currentIndex;

                let color = "bg-black/30 text-white border-white/20 hover:bg-white/10";
                if (state) {
                  color = state.isCorrect
                    ? "bg-[#64B428] text-white border-[#FFB800] font-black"
                    : "bg-red-600 text-white border-red-400 font-black";
                }
                if (isCurrent) {
                  color += " ring-4 ring-[#FFB800] scale-105";
                }

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-2xl border-2 text-xs font-extrabold transition-all flex flex-col items-center justify-center shadow-md ${color}`}
                  >
                    <span>Câu {idx + 1}</span>
                    <span className="text-[10px]">{q.iconType || "📐"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Math Rules & Tip */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/15 text-xs text-[#e0eed5] space-y-2.5">
            <div className="font-black text-white flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#FFB800]" />
              <span>Bí quyết rèn luyện Toán cùng MathPlus:</span>
            </div>
            <p className="leading-relaxed">
              Mỗi ngày dành từ 5–10 phút giải các bài toán nhanh để rèn luyện phản xạ tính nhẩm, khả năng phân tích logic và sự tập trung cao độ!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
