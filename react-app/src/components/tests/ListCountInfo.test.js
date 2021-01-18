import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import ListCountInfo from "../ListCountInfo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ListCountInfo count={4}></ListCountInfo>, div);
});

it("Format button with render. Count = 0", () => {
  const ats = render(<ListCountInfo count={0}></ListCountInfo>).baseElement
    .textContent;
  expect(ats).toBe("There are no guessed letters.");
});

it("Format button with render. Count = 1", () => {
  const ats = render(<ListCountInfo count={1}></ListCountInfo>).baseElement
    .textContent;
  expect(ats).toBe("There are 1 letter on the list");
});

it("Format button with render. Count = 5", () => {
  const ats = render(<ListCountInfo count={5}></ListCountInfo>).baseElement
    .textContent;
  expect(ats).toBe("There are 5 letters on the list");
});
