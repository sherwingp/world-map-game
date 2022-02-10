import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../../Footer";

it("renders a footer", () => {
  render(<Footer />);
  const footerElement = screen.getByTestId("footer-content");
  expect(footerElement).toHaveTextContent(
    "Copyright 2022 Created by Sherwin Panganiban, Michael Kassim, Zoë Idehen, Kehinde Alaka & Tomas Garcia"
  );
});
