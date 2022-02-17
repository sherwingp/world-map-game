const Footer = () => {
  return (
    <div className="footer">
      <span data-testid="footer-content">
        {"         "}Made by Sherwin Panganiban, Michael Kassim, Zoë Idehen,
        Kehinde Alaka & Tomas Garcia{" "}
      </span>
      <a href="https://github.com/sherwingp/world-map-game">
        <span id="right">
          View on Github <img id="githubIcon" src="/images/github.png" />
        </span>
      </a>
    </div>
  );
};

export default Footer;
