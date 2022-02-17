const Flag = ({ location }) => {
  return (
    <div>
      <img
        id="flag"
        src={`https://countryflagsapi.com/png/${location.countryCode}`}
        alt=""
      />
    </div>
  );
};

export default Flag;
