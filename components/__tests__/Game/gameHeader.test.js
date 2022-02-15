import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameHeader from "../../game/GameHeader";

describe("<GameHeader />", () => {
    it("renders a game header", () => {
        render(<GameHeader />);
        const headerElement = screen.getByTestId("game-header-content");
        expect(headerElement).toHaveTextContent("MAP-PIN");
      });
  });