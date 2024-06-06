interface DiaryInfoResponse {
  diaryId: number;
  flower: string;
  imgUrl: string[];
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  depressed: number;
  anxiety: number;
  love: number;
  spotify: string;
  isLike: boolean;
}

export interface HighestEmotionData {
  diaryId: number;
  highestEmotion: string;
}

export const findDayHighestEmotion = (
  diaries: DiaryInfoResponse[]
): HighestEmotionData[] => {
  return diaries.map((diary) => {
    const emotions: { [key: string]: number } = {
      angry: diary.angry,
      sad: diary.sad,
      delight: diary.delight,
      calm: diary.calm,
      depressed: diary.depressed,
      anxiety: diary.anxiety,
      love: diary.love,
    };

    const highestEmotion = Object.keys(emotions).reduce((a, b) =>
      emotions[a] > emotions[b] ? a : b
    );

    return {
      diaryId: diary.diaryId,
      highestEmotion,
    };
  });
};

export default findDayHighestEmotion;
