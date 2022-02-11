import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../Header";

it("renders a header", () => {
  render(<Header />);
  const headerElement = screen.getByTestId("header-content");
  expect(headerElement).toHaveTextContent("Welcome to MAP-PIN!");
});
