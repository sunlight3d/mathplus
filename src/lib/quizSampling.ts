export interface BaseQuizItem {
  id?: number | string;
  grade?: number;
  topic: string;
  question: string;
  options: any;
  correctAnswer: string;
  explanation: string;
  iconType?: string | null;
}

/**
 * Stratified sampling across diverse topics to ensure even curriculum coverage.
 * It ensures every 10-question set spans as many distinct chapters / domains as possible.
 */
export function sampleCurriculumBalanced<T extends BaseQuizItem>(
  questions: T[],
  limit: number = 10
): T[] {
  if (!questions || questions.length === 0) return [];
  if (questions.length <= limit) {
    return [...questions].sort(() => 0.5 - Math.random());
  }

  // 1. Group questions by simplified topic / domain
  const topicMap = new Map<string, T[]>();
  for (const q of questions) {
    // Normalize topic key by stripping minor prefixes
    const rawTopic = (q.topic || "CHUNG").trim().toUpperCase();
    const topicKey = rawTopic.length > 35 ? rawTopic.slice(0, 35) : rawTopic;

    if (!topicMap.has(topicKey)) {
      topicMap.set(topicKey, []);
    }
    topicMap.get(topicKey)!.push(q);
  }

  // 2. Shuffle questions inside each topic bucket
  const topicKeys = Array.from(topicMap.keys()).sort(() => 0.5 - Math.random());
  for (const key of topicKeys) {
    const bucket = topicMap.get(key)!;
    bucket.sort(() => 0.5 - Math.random());
  }

  // 3. Round-robin pick from each topic bucket to guarantee broad distribution
  const selected: T[] = [];
  const selectedQuestionTexts = new Set<string>();
  let hasMore = true;

  while (selected.length < limit && hasMore) {
    hasMore = false;
    for (const key of topicKeys) {
      if (selected.length >= limit) break;
      const bucket = topicMap.get(key)!;
      if (bucket.length > 0) {
        const item = bucket.pop()!;
        if (!selectedQuestionTexts.has(item.question)) {
          selected.push(item);
          selectedQuestionTexts.add(item.question);
          hasMore = true;
        }
      }
    }
  }

  // Fallback if still under limit
  if (selected.length < limit) {
    const remaining = questions.filter(q => !selectedQuestionTexts.has(q.question));
    remaining.sort(() => 0.5 - Math.random());
    selected.push(...remaining.slice(0, limit - selected.length));
  }

  // 4. Final shuffle so the test flow feels natural and varied
  return selected.sort(() => 0.5 - Math.random());
}
