import {
  getRandomEntry,
  getRandomNoun,
  getRandomNounCapitalized,
  getRandomVerb,
  getRandomLogLine,
  getRandomSingleCharacter,
} from "./helpers";
import Base from './base';

export default class JavaScript extends Base {
  static getRandomInitializationVars() {
    return [
      "[]",
      "this",
      "self",
      "0",
      "1",
      "true",
      "false",
      "{}",
      "null",
      "undefined",
    ];
  }

  static getRandomFunctionName() {
    return `${getRandomVerb()}${getRandomNounCapitalized()}`;
  }

  static getRandomVariableDeclaration() {
    const keyWords = ["let", "const", "var"];

    return `${getRandomEntry(keyWords)} ${getRandomNoun()} = ${getRandomEntry(
      JavaScript.getRandomInitializationVars()
    )};`;
  }

  static getRandomFillerLine() {
    const options = [
      `console.log(${getRandomLogLine()});`,
      JavaScript.getRandomVariableDeclaration(),
      `${JavaScript.getRandomFunctionName()}();`,
    ];
    return getRandomEntry(options);
  }

  static getRandomReturn() {
    return `    return ${getRandomEntry(
      JavaScript.getRandomInitializationVars()
    )};`;
  }

  static getRandomForLoopAsArray() {
    const randomChar = getRandomSingleCharacter();
    const randomNoun = getRandomNoun();

    return [
      `    for (let ${randomChar} = 0; ${randomChar} <= ${randomNoun}.length; ${randomChar}++) {`,
      `        ${JavaScript.getRandomFunctionName()}(${randomChar})`,
      "    };",
    ];
  }

  static dedupe(repeatedLines, spacing, refillFunction) {
    const checkedLines = [];
    return repeatedLines.map((randomFillerLine) => {
      // Allow one let/var otherwise remove declation
      // If repeat const refill
      if(!randomFillerLine.startsWith('for') && randomFillerLine.includes('=')) {
        const varDeclaration = randomFillerLine.trim().split('=')[0].split(' ');
        console.log(varDeclaration);
        const varName = varDeclaration[1];
        if(checkedLines.indexOf(varName) >= 0 && varDeclaration[0] === 'const') {
          return `${spacing}${refillFunction()}`;
        }
        if(checkedLines.indexOf(varName) >= 0 && varDeclaration[0] !== 'const') {
          return spacing + varName + ' =' + randomFillerLine.trim().split('=')[1];
        }
        checkedLines.push(varName);
      }

      return randomFillerLine;
    });
  }
}
