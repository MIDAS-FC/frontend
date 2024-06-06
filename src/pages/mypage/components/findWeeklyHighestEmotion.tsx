export interface EmotionData {
  date: string;
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  depressed: number;
  anxiety: number;
  love: number;
}

export interface HighestEmotionData {
  date: string;
  highestEmotion: string;
}

export const findWeeklyHighestEmotion = (
  data: EmotionData[]
): HighestEmotionData[] => {
  return data.map((entry) => {
    const emotions: { [key: string]: number } = {
      angry: entry.angry,
      sad: entry.sad,
      delight: entry.delight,
      calm: entry.calm,
      depressed: entry.depressed,
      anxiety: entry.anxiety,
      love: entry.love,
    };

    const highestEmotion = Object.keys(emotions).reduce((a, b) =>
      emotions[a] > emotions[b] ? a : b
    );

    return {
      date: entry.date,
      highestEmotion,
    };
  });
};
