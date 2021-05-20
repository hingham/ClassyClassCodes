export class DistractingClassCodeMapService {

  readonly distractingWordsMap: Map<string, boolean>;

  constructor(distractingWords: string[]) {
    this.distractingWordsMap = this.getDistractingWordMap(distractingWords);
  }

  private getDistractingWordMap(distractingWords: string[]) {
    if (!distractingWords) {
      throw new Error("input undefined");
    }

    if(!Array.isArray(distractingWords)) {
      throw new Error("invalid input");
    }

    return distractingWords.reduce((wordMap, distractingWord) => {
      const normalizedDistractingWord = distractingWord.toLocaleLowerCase();
      if (!wordMap.has(normalizedDistractingWord)) {
        wordMap.set(normalizedDistractingWord, true);
      }
      return wordMap;
    }, new Map());
  }
};
