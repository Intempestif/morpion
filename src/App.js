import logo from './Avatar.png';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>
          tic tac toe / morpion by <a href="https://www.tanguydespat.com">tanguy despat</a>
        </p>

        <p>
          for github visitors, project is running on <a href="https://tanguydespat.com/morpion">tanguydespat.com/morpion</a>
        </p>
      
      </header>
      <div className="App-body">
        <Morpion />
      </div>
    </div>
  );
}

const EMPTY = 'EMPTY';
const CIRCLE = 'CIRCLE';
const CROSS = 'CROSS';

function detectWinner(p) {
  if(p[0] === CIRCLE && p[1] === CIRCLE && p[2] === CIRCLE) return CIRCLE;
  if(p[3] === CIRCLE && p[4] === CIRCLE && p[5] === CIRCLE) return CIRCLE;
  if(p[6] === CIRCLE && p[7] === CIRCLE && p[8] === CIRCLE) return CIRCLE;

  if(p[0] === CIRCLE && p[3] === CIRCLE && p[6] === CIRCLE) return CIRCLE;
  if(p[1] === CIRCLE && p[4] === CIRCLE && p[7] === CIRCLE) return CIRCLE;
  if(p[2] === CIRCLE && p[5] === CIRCLE && p[8] === CIRCLE) return CIRCLE;

  if(p[0] === CIRCLE && p[4] === CIRCLE && p[8] === CIRCLE) return CIRCLE;
  if(p[2] === CIRCLE && p[4] === CIRCLE && p[6] === CIRCLE) return CIRCLE;

  if(p[0] === CROSS && p[1] === CROSS && p[2] === CROSS) return CROSS;
  if(p[3] === CROSS && p[4] === CROSS && p[5] === CROSS) return CROSS;
  if(p[6] === CROSS && p[7] === CROSS && p[8] === CROSS) return CROSS;

  if(p[0] === CROSS && p[3] === CROSS && p[6] === CROSS) return CROSS;
  if(p[1] === CROSS && p[4] === CROSS && p[7] === CROSS) return CROSS;
  if(p[2] === CROSS && p[5] === CROSS && p[8] === CROSS) return CROSS;

  if(p[0] === CROSS && p[4] === CROSS && p[8] === CROSS) return CROSS;
  if(p[2] === CROSS && p[4] === CROSS && p[6] === CROSS) return CROSS;
 
  if(p.every(position => position !== EMPTY)) return "MATCH NUL / DRAW";
}

function Morpion() {

  const [state, setState] = React.useState({
    player: CIRCLE,
    position: [
      EMPTY, EMPTY, EMPTY,
      EMPTY, EMPTY, EMPTY,
      EMPTY, EMPTY, EMPTY
    ],
  });

  function reset(){
    setState({
      player: CIRCLE,
      position: [
        EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY
      ],
    });
  }

  function takeTurn(position) {
    // fonction que je passe à Square pour qu'il l'appelle quand on clique dessus
    // cette fonction peut alors modifier le state car elle se trouve dans le même composant que le state

    const positions = [...state.position];
    positions[position] = state.player;

    setState({
      player: state.player === CIRCLE ? CROSS : CIRCLE,
      position: positions
    });

  }

  const winner = detectWinner(state.position);

  return (
    <div className="gridContainer">
      <div className="grid">
        <Square position={0} value={state.position[0]} takeTurn={takeTurn} />
        <Square position={1} value={state.position[1]} takeTurn={takeTurn} />
        <Square position={2} value={state.position[2]} takeTurn={takeTurn} />
        <Square position={3} value={state.position[3]} takeTurn={takeTurn} />
        <Square position={4} value={state.position[4]} takeTurn={takeTurn} />
        <Square position={5} value={state.position[5]} takeTurn={takeTurn} />
        <Square position={6} value={state.position[6]} takeTurn={takeTurn} />
        <Square position={7} value={state.position[7]} takeTurn={takeTurn} />
        <Square position={8} value={state.position[8]} takeTurn={takeTurn} />
      </div>
      {winner && <Result winner={winner} reset={reset} />}
    </div>
  );
}

function Square({position, value, takeTurn}) {

  function handleClick() {
    // fonction qui va être appelée quand on clique sur le square
    if(value === EMPTY) {
      // si la case est vide, on peut jouer
      takeTurn(position);
    }
  }

  return (
    <div className="square" onClick={handleClick}>
      {/* expression javascript, ce qui est après le AND s'exécute si l'operation avant le AND est true */}
      {value === CIRCLE && <Circle />}
      {value === CROSS && <Cross />}
    </div>
  );
}

function Circle() {
  return (
    <div className="circle">
      <svg width="100" height="100" viewBox="-50 -50 100 100">
        <circle cx="0" cy="0" r="40" />
      </svg>
    </div>
  );
}

function Cross() {
  return (
    <div className="cross">
      <svg width="100" height="100" viewBox="-50 -50 100 100">
        <line x1="-40" y1="-40" x2="40" y2="40" />
        <line x1="-40" y1="40" x2="40" y2="-40" />
      </svg>
    </div>
  );
}

function Result({winner, reset}) {
  return (
    <div className="result">
      THE GAME IS OVER !
      <br /><br />
      {winner === CIRCLE && 'Le Cercle gagne ! / Circle wins !'}
      {winner === CROSS && 'Le Croix gagne ! / Cross wins !'}
      {winner === 'MATCH NUL / DRAW' && 'Match nul / Draw'}
      <br /><br />
      <button onClick={reset}>Rejouer / Reset</button>
    </div>
  );
}

export default App;