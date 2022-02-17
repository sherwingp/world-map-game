const ModeSelector = ({ setMode }) => {
  let option;

  const onSubmit = (e) => {
    e.preventDefault();
    setMode(option);
  };

  const onChange = (e) => {
    option = e.target.value;
  };

  return (
    <div className="mode-selector">
      <div className="col-sm-12">
        <h3>Mode</h3>
        <form onSubmit={onSubmit}>
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="radio"
                value="classic"
                onChange={onChange}
                className="form-check-input"
              />
              Classic
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="radio"
                value="guess"
                onChange={onChange}
                className="form-check-input"
              />
              Guess the Country
            </label>
          </div>

          <div className="form-group">
            <button
              id="mode-btn"
              className="btn btn-primary mt-2"
              type="submit"
            >
              Change mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModeSelector;
