import { ClassCodeApprovalService } from "./classCodeApproval.service";
import { DistractingClassCodeMapService } from "./distractingClassCodeMap.service";


describe("ClassCodeApprovalService", () => {
  const testList = [
    "fuzzy",
    "rats",
    "egg",
    "darn",
    "kthx",
    "haha",
    "ugh",
    "777",
    "cheese",
  ];

  const mockExistingCodes = {
    "TAKEN1": true,
    "TAKEN2": true,
    "TAKEN4": true,
  };

  const myDistractingWordRandomizedService = new DistractingClassCodeMapService(testList);

  const myCodeValidatorService = new ClassCodeApprovalService(
    myDistractingWordRandomizedService,
    mockExistingCodes
  );

  function getWordWithRandomizedCases(word: string) {
    let wordRandomized = "";
    for (let i = 0; i < word.length; i += 2) {
      wordRandomized = wordRandomized + word[i];

      if (word[i + 1]) {
        wordRandomized = wordRandomized + word[i + 1].toUpperCase();
      }
    }
    return wordRandomized;
  }

  describe("codeIsApproved", () => {

    describe("on success", () => {
      const distractingWordRandomized = getWordWithRandomizedCases(testList[0])

      describe("it returns true if", () => {
        it("code is not distracting and not taken", () => {
          const word = "N0TTAKEN";
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(true);
        });

        it("code is longer than 12 characters and is not a distracting string and is not taken", () => {
          const word = "n0tTakenLongCode";
          if (word.length < 12) {
            fail("Word should be at least 12 characters in length");
          }
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(true);
        });

        it("code is a distracting string anagram", () => {
          const distractingWordRandomizedAnagram = distractingWordRandomized.slice(1) + distractingWordRandomized[0];

          const word = distractingWordRandomizedAnagram;
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(true);
        });

        it("code contains a distracting string anagram", () => {
          const distractingWordRandomizedAnagram = distractingWordRandomized.slice(1) + distractingWordRandomized[0];
          const word = `T0${distractingWordRandomizedAnagram}P`;
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(true);
        });
      });

      describe("it returns false if", () => {

        it("code is taken", () => {
          const word = Object.keys(mockExistingCodes)[0];
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });

        it("code is a distracting string", () => {
          const codeIsApproved = myCodeValidatorService.codeIsApproved(distractingWordRandomized);

          expect(codeIsApproved).toBe(false);
        });

        it("code contains a substring that is a distracting string", () => {
          const word = `B0${distractingWordRandomized}0K`;
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });

        it("code begins with substring that is a distracting string", () => {
          const word = `${distractingWordRandomized}B00K`;
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });

        it("code ends with substring that is a distracting string", () => {
          const word = `B00K${distractingWordRandomized}`;
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });

        it("code contains a subsequence that is a distracting string", () => {
          const word = distractingWordRandomized.split("").join("T");
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });

        it("code is longer than 12 characters and contains a subsequence that is a distracting string", () => {
          const word = distractingWordRandomized.split("").join("M0C");
          
          if (word.length < 12) {
            fail("Word should be at least 12 characters in length");
          }
          const codeIsApproved = myCodeValidatorService.codeIsApproved(word);

          expect(codeIsApproved).toBe(false);
        });
      });
    });

    describe("on error", () => {
      describe("throws an error if", () => {
        it("input is not a string", () => {
          try {
            const numString: any = 123;
            myCodeValidatorService.codeIsApproved(numString);
          } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe("input must be of type string");
          }
        });

        it("input is not defined", () => {
          try {
            myCodeValidatorService.codeIsApproved("");
          } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe("input undefined");
          }
        });
      });
    });
  });
});
