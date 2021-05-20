import { DistractingClassCodeMapService } from "./distractingClassCodeMap.service";

export class ClassCodeApprovalService {

  private readonly distractingWordsMap: Map<string, boolean>;

  constructor(
    public distractingWords: DistractingClassCodeMapService, 
    public existingCodes: Record<string, boolean>,
  ) {
    this.distractingWordsMap = distractingWords.distractingWordsMap;
  }

  public codeIsApproved(word: string) {
    if(!word) {
      throw new Error("input undefined");
    }

    if(typeof word !== "string") {
      throw new Error("input must be of type string");
    }

    return this.codeIsAvailable(word) && this.codeIsClassy(word);
  }

  private codeIsAvailable(word: string) {
    if (this.existingCodes.hasOwnProperty(word)) {
      return false;
    }
    return true;
  }

  private codeIsClassy(word: string) {
    const normalizedWord = word.toLowerCase();

    if (this.wordContainsDistractingSubString(normalizedWord)) {
      return false;
    }
    return true;
  }

  private wordContainsDistractingSubString(word: string, subStringMemo: Record<string, boolean> = {}) {
    if (word.length === 0) {
      return false;
    }

    if (this.distractingWordsMap.has(word)) {
      return true;
    }

    if (subStringMemo.hasOwnProperty(word)) {
      return false;
    }

    for (let i = 0; i < word.length; i++) {
      const subString = word.slice(0, i) + word.slice(i + 1);
      if (this.wordContainsDistractingSubString(subString, subStringMemo)) {
        return true;
      }
    }

    subStringMemo[word] = false;
    return false;
  }
}
