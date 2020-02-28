class Calculator {
  firstNumber = element(by.model("first"));
  secondNumber = element(by.model("second"));
  goButton = element(by.id("gobutton"));
  latestResult = element(by.binding("latest"));
  select = element(by.css("select"));
  title = "Super Calculator";

  go = function() {
    browser.get("http://juliemr.github.io/protractor-demo/");
  };

  setFirstNumber = function(value) {
    this.firstNumber.sendKeys(value);
  };

  getFirstFieldValue = async function() {
    const val = await this.firstNumber.getAttribute("value");
    return parseInt(val);
  };

  selectDivision = function() {
    this.selectOperator("DIVISION");
  };

  selectAddition = function() {
    this.selectOperator("ADDITION");
  };

  selectSubstraction = function() {
    this.selectOperator("SUBTRACTION");
  };

  selectMultipliction = function() {
    this.selectOperator("MULTIPLICATION");
  };

  selectModulo = function() {
    this.selectOperator("MODULO");
  };

  selectOperator = function(val) {
    element(by.css("select")).click();
    element(by.css(`option[value="${val}"]`)).click();
  };

  setSecondNumber = function(value) {
    this.secondNumber.sendKeys(value);
  };

  getSecondFieldValue = async function() {
    const val = await this.secondNumber.getAttribute("value");
    return parseInt(val);
  };

  evaluate = function() {
    this.goButton.click();
  };

  getResult = async function() {
    const val = await this.latestResult.getText();
    return parseInt(val);
  };
}

module.exports = Calculator;
