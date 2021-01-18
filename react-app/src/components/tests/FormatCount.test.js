import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import FormatCount from "../FormatCount";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormatCount count={4}></FormatCount>, div);
});

it("Format count with render. Count = 4", () => {
  const ats = render(<FormatCount count={4}></FormatCount>).baseElement
    .textContent;
  expect(ats).toBe("Moves left: 4");
});

it("Format count with render. Count = 0", () => {
  const ats = render(<FormatCount count={0}></FormatCount>).baseElement
    .textContent;
  expect(ats).toBe("Lost");
});

it("Format count with render. localStorage WON", () => {
  localStorage.setItem("WON", "WON");
  const ats = render(<FormatCount count={3}></FormatCount>).baseElement
    .textContent;
  expect(ats).toBe("You WON!");
  localStorage.removeItem("WON");
});
