# ClassyClassCodes
Application that validates codes are appropriate.

## Inputs:
- list of distracting words
- object containing keys with existing codes that cannot be used

## Output:
- boolean
- true if the code does not yet exist and is determined not contain a distracting word
- false if code already exists or is determined to contain a distracting word

### Run Tests
- clone project `git clone https://github.com/hingham/ClassyClassCodes.git`
- `npm i` to install packages
- `npm run test` to run tests