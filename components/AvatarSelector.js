import { useState } from "react";
import { nanoid } from "nanoid";

const AvatarSelector = () => {
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/adventurer/:seed.svg"
  );

  const hairStyles = [
    "short16", "short15", "short14", "short13", "short12", "short11", "short10", "short09", "short08", "short07", "short06", "short05", "short04", "short03", "long20", "short02", "short01", "long19", "long18", "long17", "long16", "long15", "long14", "long13", "long12", "long11", "long10", "long09", "long08", "long07", "long06", "long05", "long04", "long03", "long02", "long01"
  ];

  const [hair, setHair] = useState(0)

  const changeHair = (e) => {
    e.preventDefault()
    let defaultAvatar = "https://avatars.dicebear.com/api/adventurer/:seed.svg"
    hair >= 36 ? setHair(0) : setHair(hair + 1)
    console.log(avatar);
    setAvatar(`${defaultAvatar}?hair=${hairStyles[hair]}`)
  };

  const changeSkin = (e) => {
    e.preventDefault()
    let defaultAvatar = "https://avatars.dicebear.com/api/adventurer/:seed.svg"
    hair >= 36 ? setHair(0) : setHair(hair + 1)
    console.log(avatar);
    setAvatar(`${defaultAvatar}?hair=${hairStyles[hair]}`)
  };

  return (
    <div className="avatar-selector-container">
      <img style={{ width: 70 + "%" }} src={avatar} alt="avatar" />
      <form id="style-selector" onSubmit={changeHair}>
      <button
        className="change-hair"
        type="submit"
        value="Submit"
      >
        Change hair
      </button>
      </form>
      <form id="style-selector" onSubmit={changeSkin}>
      <button
        className="change-hair"
        type="submit"
        value="Submit"
      >
        Change hair
      </button>
      </form>
    </div>
  );
};
export default AvatarSelector;
