# MAP-PIN

A multiplayer interactive world map game where the host pins a secret location somewhere in the world and players will be given clues to guess where that location is to earn points. The closer you are to the location the more points you earn to win te game!

## Contributors

[![Sherwin Panganiban](https://img.icons8.com/nolan/25/github.png)](https://github.com/sherwingp) Sherwin Panganiban\ [![Michael Kassim](https://img.icons8.com/nolan/25/github.png)](https://github.com/Fadaka) Michael Kassim\ [![Zoë Idehen](https://img.icons8.com/nolan/25/github.png)](https://github.com/zidehen) Zoë Idehen\ [![Kehinde Alaka](https://img.icons8.com/nolan/25/github.png)](https://github.com/Alaka-K) Kehinde Alaka\ [![Tomas Garcia](https://img.icons8.com/nolan/25/github.png)](https://github.com/TomasGarciaDev) Tomas Garcia  

## Full Stack Technologies

- Javascript
- React
- Next.js
- Node.js
- Socket.io
- Mapbox
- HTML
- CSS
- Bootstrap
- ESLint
- Jest & Cypress (for unit, integration testing)
- Heroku (for deployment)

## How to Use

This app is fully deployed on Heroku [here](https://mappin-game.herokuapp.com/)\

Alternatively, you can install the code and run the app locally:

1. From the command line, clone this repository to your machine:

```
git clone https://github.com/sherwingp/world-map-game.git
cd world-map-game
```

2. Install dependencies:

```
npm install #(requires node to be installed)
```

3. Then run the development server:

```
npm run dev
```

## User Stories

```
As a player,
So that I can play the game,
I would like to enter my player name

As a player,
So that I can guess the secret location,
I would like to see a world map

As a player, 
So that I can select my guesses,
I want to be able to click on the country/city that I guess on the map

As a player, 
So that I can know how well I’m doing,
I want to see my score

As a player, 
So that I know how close I am to the answer, 
I would like my score to go up

As a player,
So that I can compete against other players,
I want other players to join in my game

As a host,
So that the other players can start the game
I want to be able to set the secret location

As a Player,
So that I know I'm close to the correct answer,
I would like the map to zoom in to a radius that includes the right answer
```
