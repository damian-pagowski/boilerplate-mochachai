const Calculator = require("../page_object/Calculator.po");

describe("Protractor Demo App", function() {
  const calculator = new Calculator();

  beforeEach(function() {
    calculator.go();
  });

  it("should have a title", function() {
    expect(browser.getTitle()).toEqual( calculator.title);

  });

  it("should add one and two", function() {
    calculator.setFirstNumber(1);
    calculator.setSecondNumber(2);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(3);

  });

  it("should add four and six", function() {
    calculator.setFirstNumber(4);
    calculator.setSecondNumber(6);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(10);
  });

  it("should read the value from an input", function() {
    calculator.setFirstNumber(1);
    expect(calculator.getFirstFieldValue()).toEqual(1);
  });

  it("should divide 6 by 2", function() {
    calculator.setFirstNumber(6);
    calculator.selectDivision();
    calculator.setSecondNumber(2);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(3);

  });

  it("should multiply 6 by 3", function() {
    calculator.setFirstNumber(6);
    calculator.selectMultipliction();
    calculator.setSecondNumber(3);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(18);

  });
  it("should substract 3 from 10", function() {
    calculator.setFirstNumber(10);
    calculator.selectSubstraction();
    calculator.setSecondNumber(3);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(7);

  });

  it("should calculate 8 modulo 3", function() {
    calculator.setFirstNumber(8);
    calculator.selectModulo();
    calculator.setSecondNumber(3);
    calculator.evaluate();
    expect(calculator.getResult()).toEqual(2);

  });
});
