import { DistractingClassCodeMapService } from "./distractingClassCodeMap.service";

describe("DistractingClassCodeMapService", () => {
  const testList = [
    "ratS",
    "eGg",
    "HaHa",
    "777",
    "chEEse",
  ];

  const distractingClassCodeMapService = new DistractingClassCodeMapService(testList);

  describe("on success", () => {
    it("returns expected map of all words normalized to lower case", () => {
      const expectedMap = new Map();
      for (let i = 0; i < testList.length; i++) {
        expectedMap.set(testList[i].toLowerCase(), true)
      }

      expect(distractingClassCodeMapService.distractingWordsMap).toEqual(expectedMap);
    });
  });
});
