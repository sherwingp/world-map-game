import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div id="navbar">
        <Link href="/">
          <a className="home-link">Home</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
