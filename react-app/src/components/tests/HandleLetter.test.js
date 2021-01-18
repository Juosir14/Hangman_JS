import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import HandleLetter from "../HandleLetter";

it("renders without crashing", () => {
  const handlerLettter = new HandleLetter(4, ["W", "O", "R", "D"], "a");
  const div = document.createElement("div");
  ReactDOM.render(handlerLettter.render(), div);
});

//Found a bug during unit testing
//method did not recognize upper O in lower up letters list
//fixed in main code
it("Handle letter. Letters = word. letter = O", () => {
  const handlerLettter = new HandleLetter(["w", "o", "r", "d"], "O");

  expect(handlerLettter.validate()).toBe("This letter already guessed.");
});

it("Handle letter.  Letters = word. letter = aa", () => {
  const handlerLettter = new HandleLetter(["w", "o", "r", "d"], "aa");

  expect(handlerLettter.validate()).toBe("It is to long!");
});

it("Handle letter. Letters = word. letter = 1", () => {
  const handlerLettter = new HandleLetter(["w", "o", "r", "d"], "1");

  expect(handlerLettter.validate()).toBe("It is not a letter!");
});

it("Handle letter. Letters = word. letter = null", () => {
  const handlerLettter = new HandleLetter(["w", "o", "r", "d"], "");

  expect(handlerLettter.validate()).toBe("It can not be empty!");
});

it("Handle letter. localStorage WON", () => {
  localStorage.setItem("WON", "WON");
  const handlerLettter = new HandleLetter(["w", "o", "r", "d"], "");
  expect(handlerLettter.validate()).toBe("You WON!");
  localStorage.removeItem("WON");
});
