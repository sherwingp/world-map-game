import { useContext } from "react";
import LocationContext from "../../contexts/location";

const Location = () => {
    const { location, setLocation } = useContext(LocationContext);
    return (
      <div>
        <p>Your location : {location.lng} {location.lat} </p> 
      </div>
    )
  }

  export default Location;