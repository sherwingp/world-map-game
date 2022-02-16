import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayersHeader from "../../game/playersHeader";

describe("<PlayersHeader />", () => {
  it("renders a game header", () => {
    render(<PlayersHeader />);
    const headerElement = screen.getByTestId("players-header-content");
    expect(headerElement).toHaveTextContent("Players List");
  });
});
