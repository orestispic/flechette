import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const START_SCORE = 301;

  const [score, setScore] = useState(START_SCORE);
  const [currentThrow, setCurrentThrow] = useState([]);
  const [history, setHistory] = useState([]);

  const buttons = useMemo(() => {
    return [
      [25, 50],
      [1, 6, 11, 16],
      [2, 7, 12, 17],
      [3, 8, 13, 18],
      [4, 9, 14, 19],
      [5, 10, 15, 20],
    ];
  }, []);

  const currentTotal = currentThrow.reduce((total, value) => total + value, 0);

  function addValue(value) {
    setCurrentThrow((current) => {
      if (current.length >= 9) return current;
      return [...current, value];
    });
  }

  function enterThrow() {
    if (currentThrow.length === 0) return;
    if (currentTotal > score) return;

    const historyLine = `-${currentThrow.join("-")}`;

    setScore((current) => current - currentTotal);
    setHistory([{ line: historyLine, total: currentTotal, values: currentThrow }]);
    setCurrentThrow([]);
  }

  function erase() {
    if (currentThrow.length > 0) {
      setCurrentThrow((current) => current.slice(0, -1));
      return;
    }

    setHistory((current) => {
      if (current.length === 0) return current;
      const previous = current[current.length - 1];
      setScore((scoreValue) => Math.min(START_SCORE, scoreValue + previous.total));
      setCurrentThrow(previous.values);
      return [];
    });
  }

  function newGame() {
    setScore(START_SCORE);
    setCurrentThrow([]);
    setHistory([]);
  }

  return (
    <main className="app">
      <div className="phone">
        <section className="score-zone">
          <div className="history">
            {history.map((item, index) => (
              <div key={`${item.line}-${index}`} className="history-item">
                <div>{item.line}</div>
                <div>= {item.total}</div>
              </div>
            ))}
          </div>

          <div className="score">{score}</div>

          <div className="current-throw">
            {currentThrow.length > 0 ? `-${currentThrow.join("-")}` : ""}
          </div>
        </section>

        <section className="buttons">
          <div className="grid row-top">
            <div />
            <button className="btn btn-green" onClick={() => addValue(25)}>25</button>
            <button className="btn btn-green" onClick={() => addValue(50)}>50</button>
            <button className="btn btn-red btn-back" onClick={erase} aria-label="Effacer">←</button>
          </div>

          {buttons.slice(1).map((row, rowIndex) => (
            <div key={rowIndex} className="grid">
              {row.map((value) => (
                <button key={value} className="btn btn-green" onClick={() => addValue(value)}>
                  {value}
                </button>
              ))}
            </div>
          ))}
        </section>

        <div className="footer-buttons">
          <button className="btn-main btn-new" onClick={newGame}>Nouvelle Partie</button>
          <button className="btn-main btn-enter" onClick={enterThrow}>Entrée</button>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
