import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import ShowRandomWord from "../ShowRandomWord";

it("renders without crashing", () => {
  localStorage.setItem("randomWord", "WORD");
  const div = document.createElement("div");
  ReactDOM.render(
    <ShowRandomWord count={4} letters={["W", "O", "R", "D"]}></ShowRandomWord>,
    div
  );
});

it("ShowWord. Count = 4. Letters = WORD", () => {
  const ats = render(
    <ShowRandomWord count={4} letters={["W", "O", "R", "D"]}></ShowRandomWord>
  ).baseElement.textContent;
  expect(ats).toBe("WON");
});

it("ShowWord.  Count = 4. Letters = WORKWOJD", () => {
  const ats = render(
    <ShowRandomWord
      count={8}
      letters={["W", "O", "J", "K", "W", "O", "J", "D"]}
    ></ShowRandomWord>
  ).baseElement.textContent;
  expect(ats).toBe("WO_D");
});

it("ShowWord.  Count = 0. Letters = WORKWOJDAB", () => {
  const ats = render(
    <ShowRandomWord
      count={0}
      letters={["W", "O", "J", "K", "W", "O", "J", "D", "A", "B"]}
    ></ShowRandomWord>
  ).baseElement.textContent;
  expect(ats).toBe("WORD");
});

it("ShowWord.  Count = 5. Letters = ABCEF", () => {
  const ats = render(
    <ShowRandomWord
      count={5}
      letters={["A", "B", "C", "E", "F"]}
    ></ShowRandomWord>
  ).baseElement.textContent;
  expect(ats).toBe("____");
});
