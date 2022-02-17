import Link from "next/link";

export default function GameHeader() {
  return (
    <div className="gameheader">
      <h1 data-testid="game-header-content">
        <Link href="/">
          <a
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            mappin!
          </a>
        </Link>
      </h1>
    </div>
  );
}
