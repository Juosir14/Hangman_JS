import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import HangMan from "../HangMan";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HangMan></HangMan>, div);
});

it("HangMan randomWord.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("RandomWord")).toHaveTextContent("________");
});

it("HangMan button.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("button")).toHaveTextContent("Guess");
});

it("HangMan badges.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("badges")).toHaveTextContent("Moves left: 10");
});

it("HangMan letters.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("letters")).toHaveTextContent("");
});

it("HangMan list.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("list")).toHaveTextContent(
    "There are no guessed letters."
  );
});

it("HangMan error.", () => {
  const { getByTestId } = render(<HangMan></HangMan>);
  expect(getByTestId("error")).toHaveTextContent("");
});
