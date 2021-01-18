import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import MainCounting from "../MainCounting";

const mainCounting = new MainCounting();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(mainCounting.validate("a"), div);
});
//this letter already guessed, because we pushed 'a' in render function row 10, ReactDOM......te("a"),..
it("Main counting. letter = a", () => {
  expect(mainCounting.validate("a")).toBe("This letter already guessed.");
});

it("Main counting. letter = r", () => {
  expect(mainCounting.validate("r")).toBe("");
});

it("Main counting. letter = aaa", () => {
  expect(mainCounting.validate("aaa")).toBe("It is to long!");
});

it("Main counting. letter = 3", () => {
  expect(mainCounting.validate("3")).toBe("It is not a letter!");
});

it("Main counting. letter = null", () => {
  expect(mainCounting.validate("")).toBe("It can not be empty!");
});

it("Main counting. localStorage WON", () => {
  localStorage.setItem("WON", "WON");
  expect(mainCounting.validate("")).toBe("You WON!");
  localStorage.removeItem("WON");
});
