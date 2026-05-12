import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

function App() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [stockfishThinking, setStockfishThinking] = useState(false);

  // TODO: Integrate Stockfish WASM
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    setFen(game.fen());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#0a3d0a', color: 'white', minHeight: '100vh', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#ffcc00' }}>🐟 Pokémon Stockfish Chess 🐟</h1>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div>
          <h2>You (Trainer)</h2>
          <Chessboard 
            position={fen} 
            onPieceDrop={(source, target) => {
              try {
                const move = game.move({ from: source, to: target, promotion: 'q' });
                if (move) {
                  setFen(game.fen());
                  setTimeout(makeRandomMove, 300);
                }
              } catch {}
            }}
            boardOrientation="white"
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🐟👗</div>
          <h3>Stockfish Maid</h3>
          <p>{stockfishThinking ? 'Calculating... 💭' : 'Ready to battle!'}</p>
        </div>
      </div>
      <p style={{ marginTop: '30px' }}>تصميم بوكيمون كلاسيكي - Stockfish 18 قريباً</p>
    </div>
  );
}

export default App;