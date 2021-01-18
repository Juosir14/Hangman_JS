import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import FormatButton from "../FormatButton";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormatButton count={4}></FormatButton>, div);
});

it("Format button with render. Count = 0", () => {
  const ats = render(<FormatButton count={0}></FormatButton>).baseElement
    .textContent;
  expect(ats).toBe("Restart");
});

it("Format button with render. Count = 3", () => {
  localStorage.setItem("Word", "zero");
  const ats = render(<FormatButton count={3}></FormatButton>).baseElement
    .textContent;
  expect(ats).toBe("Guess");
  localStorage.removeItem("Word");
});

it("Format button with render. localStorage WON", () => {
  localStorage.setItem("WON", "WON");
  const ats = render(<FormatButton count={3}></FormatButton>).baseElement
    .textContent;
  expect(ats).toBe("Restart");
  localStorage.removeItem("WON");
});

it("Format button with render. localStorage WON", () => {
  localStorage.setItem("Word", "w");
  localStorage.setItem("randomWord", "w");
  const ats = render(<FormatButton count={3}></FormatButton>).baseElement
    .textContent;
  expect(ats).toBe("Restart");
  localStorage.removeItem("Word");
  localStorage.removeItem("randomWord");
});

// it("Format count with render. Count = 0", () => {
//   const ats = render(<FormatCount count={0}></FormatCount>).baseElement
//     .textContent;
//   expect(ats).toBe("Lost");
// });

// it("Format count with render. localStorage WON", () => {
//   localStorage.setItem("WON", "WON");
//   const ats = render(<FormatCount count={3}></FormatCount>).baseElement
//     .textContent;
//   expect(ats).toBe("You WON!");
// });
