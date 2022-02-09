import Player from "./player"

const PlayersList = (props) => {
    const players = props.players;
    const playersList = players.map((player) => <Player text={player} />);

    return <li>{playersList}</li>;
}

export default PlayersList;
