import { StudentProfile, QuizAttempt, TopicMastery } from '../types';
import { TOPICS, QUIZ_QUESTIONS, BADGES } from '../data/curriculumData';

const STORAGE_KEY_PROFILES = 'toan4_profiles_v1';
const STORAGE_KEY_ACTIVE_ID = 'toan4_active_profile_id';
const STORAGE_KEY_PARENT_PIN = 'toan4_parent_pin';

export const DEFAULT_PIN = '2026';

export const INITIAL_PROFILES: StudentProfile[] = [
  {
    id: 'student_1',
    name: 'Bé Nam',
    avatar: '👦',
    grade: 'Lớp 4A1',
    stars: 85,
    streakDays: 4,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalTimeMinutes: 125,
    dailyGoalMinutes: 15,
    todayMinutes: 12,
    unlockedBadges: ['first_quiz', 'master_angles', 'streak_3'],
    gameHighScores: {
      pomeloHarvest: 80,
      speedMath: 95,
      unitRacer: 70,
      angleHunter: 90
    },
    history: [
      {
        id: 'att_1',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        topicId: 2,
        topicTitle: 'Góc và đơn vị đo góc',
        score: 100,
        totalQuestions: 4,
        timeSpentSeconds: 140,
        answers: [
          { questionId: 'q2_1', questionText: 'Đơn vị đo góc thông dụng là gì?', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q2_2', questionText: 'Góc lớn hơn góc vuông nhưng bé hơn góc bẹt là gì?', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q2_3', questionText: 'Đồng hồ chỉ 6 giờ tạo thành góc gì?', userSelectedId: 'c', correctOptionId: 'c', isCorrect: true },
          { questionId: 'q2_4', questionText: 'Trong 4 góc sau, góc nào là góc nhọn?', userSelectedId: 'a', correctOptionId: 'a', isCorrect: true }
        ]
      },
      {
        id: 'att_2',
        date: new Date(Date.now() - 86400000).toISOString(),
        topicId: 4,
        topicTitle: 'Một số đơn vị đo đại lượng',
        score: 80,
        totalQuestions: 5,
        timeSpentSeconds: 210,
        answers: [
          { questionId: 'q4_1', questionText: '3 tấn 5 tạ đổi ra kg bằng bao nhiêu?', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q4_2', questionText: 'Voi nặng 1 tấn 200 kg bằng bao nhiêu yến?', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q4_3', questionText: '4 m² 20 dm² = ... dm²?', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q4_4', questionText: 'Năm 938 thuộc thế kỉ nào?', userSelectedId: 'a', correctOptionId: 'b', isCorrect: false },
          { questionId: 'q4_5', questionText: '2 phút 15 giây bằng bao nhiêu giây?', userSelectedId: 'a', correctOptionId: 'a', isCorrect: true }
        ]
      },
      {
        id: 'att_3',
        date: new Date().toISOString(),
        topicId: 5,
        topicTitle: 'Phép cộng và phép trừ',
        score: 75,
        totalQuestions: 4,
        timeSpentSeconds: 180,
        answers: [
          { questionId: 'q5_1', questionText: 'Kết quả 438 589 - 235 072', userSelectedId: 'a', correctOptionId: 'a', isCorrect: true },
          { questionId: 'q5_2', questionText: 'Tính thuận tiện: 372 + 290 + 10 + 28', userSelectedId: 'a', correctOptionId: 'a', isCorrect: true },
          { questionId: 'q5_3', questionText: 'Tìm hai số khi biết Tổng và Hiệu (bút chì)', userSelectedId: 'b', correctOptionId: 'b', isCorrect: true },
          { questionId: 'q5_4', questionText: 'Hình chữ nhật nửa chu vi 36 cm, dài hơn rộng 8 cm', userSelectedId: 'a', correctOptionId: 'b', isCorrect: false }
        ]
      }
    ]
  }
];

export function getProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (!raw) {
      saveProfiles(INITIAL_PROFILES);
      return INITIAL_PROFILES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROFILES;
  }
}

export function saveProfiles(profiles: StudentProfile[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save profiles:', e);
  }
}

export function getActiveProfileId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_ID) || 'student_1';
  } catch {
    return 'student_1';
  }
}

export function setActiveProfileId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
  } catch {}
}

export function getActiveProfile(): StudentProfile {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const found = profiles.find(p => p.id === activeId);
  return found || profiles[0] || INITIAL_PROFILES[0];
}

export function updateActiveProfile(updater: (prev: StudentProfile) => StudentProfile): StudentProfile {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const idx = profiles.findIndex(p => p.id === activeId);
  if (idx === -1) return profiles[0];

  const updated = updater(profiles[idx]);
  profiles[idx] = updated;
  saveProfiles(profiles);
  return updated;
}

export function getParentPin(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_PARENT_PIN) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function setParentPin(pin: string) {
  try {
    localStorage.setItem(STORAGE_KEY_PARENT_PIN, pin);
  } catch {}
}

export function recordQuizAttempt(
  topicId: number | 'all',
  topicTitle: string,
  answers: {
    questionId: string;
    questionText: string;
    userSelectedId: string;
    correctOptionId: string;
    isCorrect: boolean;
  }[],
  timeSpentSeconds: number
): { attempt: QuizAttempt; earnedStars: number; newBadges: string[] } {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const score = Math.round((correctCount / answers.length) * 100);
  const earnedStars = correctCount * 3 + (score === 100 ? 5 : 0);

  const attempt: QuizAttempt = {
    id: 'att_' + Date.now(),
    date: new Date().toISOString(),
    topicId,
    topicTitle,
    score,
    totalQuestions: answers.length,
    timeSpentSeconds,
    answers
  };

  const newBadges: string[] = [];

  updateActiveProfile(prev => {
    const updatedHistory = [attempt, ...prev.history];
    const updatedStars = prev.stars + earnedStars;
    const additionalMinutes = Math.max(1, Math.ceil(timeSpentSeconds / 60));
    const today = new Date().toISOString().split('T')[0];
    const isToday = prev.lastActiveDate === today;

    // Check streak
    let streakDays = prev.streakDays;
    if (!isToday) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (prev.lastActiveDate === yesterday) {
        streakDays += 1;
      } else {
        streakDays = 1;
      }
    }

    // Badge evaluations
    const unlocked = new Set(prev.unlockedBadges);
    if (!unlocked.has('first_quiz')) {
      unlocked.add('first_quiz');
      newBadges.push('first_quiz');
    }
    if (score === 100 && !unlocked.has('perfect_10')) {
      unlocked.add('perfect_10');
      newBadges.push('perfect_10');
    }
    if (streakDays >= 3 && !unlocked.has('streak_3')) {
      unlocked.add('streak_3');
      newBadges.push('streak_3');
    }
    if (topicId === 2 && score >= 80 && !unlocked.has('master_angles')) {
      unlocked.add('master_angles');
      newBadges.push('master_angles');
    }
    if (topicId === 5 && score >= 80 && !unlocked.has('master_sum_diff')) {
      unlocked.add('master_sum_diff');
      newBadges.push('master_sum_diff');
    }
    if (topicId === 4 && score >= 80 && !unlocked.has('master_measures')) {
      unlocked.add('master_measures');
      newBadges.push('master_measures');
    }

    return {
      ...prev,
      stars: updatedStars,
      totalTimeMinutes: prev.totalTimeMinutes + additionalMinutes,
      todayMinutes: (isToday ? prev.todayMinutes : 0) + additionalMinutes,
      streakDays,
      lastActiveDate: today,
      history: updatedHistory,
      unlockedBadges: Array.from(unlocked)
    };
  });

  return { attempt, earnedStars, newBadges };
}

export function computeTopicMastery(profile: StudentProfile): TopicMastery[] {
  return TOPICS.map(topic => {
    // Collect all answers belonging to this topic from user history
    let attempted = 0;
    let correct = 0;
    const wrongQuestionIds = new Set<string>();

    profile.history.forEach(att => {
      att.answers.forEach(ans => {
        // Find if question belongs to this topic
        const q = QUIZ_QUESTIONS.find(item => item.id === ans.questionId);
        if (q && q.topicId === topic.id) {
          attempted += 1;
          if (ans.isCorrect) {
            correct += 1;
          } else {
            wrongQuestionIds.add(ans.questionId);
          }
        }
      });
    });

    const percentage = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    let status: 'mastered' | 'improving' | 'needs_practice' = 'needs_practice';
    if (attempted >= 3) {
      if (percentage >= 80) status = 'mastered';
      else if (percentage >= 50) status = 'improving';
      else status = 'needs_practice';
    } else if (attempted > 0) {
      status = 'improving';
    }

    // Extract weak concepts
    const weakConcepts: string[] = [];
    wrongQuestionIds.forEach(qId => {
      const q = QUIZ_QUESTIONS.find(item => item.id === qId);
      if (q && q.hint) {
        weakConcepts.push(q.hint);
      }
    });

    return {
      topicId: topic.id,
      topicTitle: topic.title,
      attempted,
      correct,
      percentage,
      status,
      weakConcepts: weakConcepts.slice(0, 3)
    };
  });
}
