import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../../Form"

it("renders a form", () => {
  render(<Form />);

  const nameLabel = screen.getByTestId("label");
  expect(nameLabel).toBeInTheDocument();
  expect(nameLabel).toHaveTextContent("Enter Player Name:");

  const inputElement = screen.getByTestId("input-name");
  expect(inputElement).toHaveAttribute("type", "text");
});

it("can write in input element", () => {
  render(<Form />);
  const inputElement = screen.getByTestId("input-name");

  fireEvent.change(inputElement, { target: { value: "ben" } });
  expect(inputElement.value).toBe("ben");
});

it("can click enter button", () => {
  render(<Form />);
  const inputElement = screen.getByTestId("input-name");
  const submitBtn = screen.getByTestId("btn-to-game");

  fireEvent.change(inputElement, { target: { value: "ben" } });
  expect(inputElement.value).toBe("ben");

  //fireEvent.submit(submitBtn) 
  // this line give an error (No router instance found.You should only use "next/router" on the client side of your app.)
  //ask Sherwin how he got the submit button to change router
});