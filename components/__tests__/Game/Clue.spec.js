import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Clue from "../../game/Clue";

describe("<Clue />", () => {
  it("Creates a clue list item", () => {
    render(
      <ul>
        <Clue text="test" />
      </ul>
    );

    const headerElement = screen.getByText("test");
    expect(headerElement).toHaveTextContent("test");
  });
});
