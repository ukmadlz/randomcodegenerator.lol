export default class Base {
  static dedupe(repeatedLines, spacing, refillFunction) {
    const checkedLines = [];
    return repeatedLines.map((randomFillerLine) => {
      if(randomFillerLine.trim().split('=').length > 1) {
        const varCheck = randomFillerLine.trim().split('=')[0].split(' ')[1];
        if(checkedLines.indexOf(varCheck) >= 0) {
            console.log(varCheck);
            return `${spacing}${refillFunction()}`;
        }
        checkedLines.push(varCheck);
      }
      return randomFillerLine;
    });
  }
}