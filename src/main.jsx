import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function FlechetteScoreApp() {
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

    const historyLine = `-${currentThrow.join('-')}`;

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
      return current.slice(0, -1);
    });
  }

  function newGame() {
    setScore(START_SCORE);
    setCurrentThrow([]);
    setHistory([]);
  }

  return (
    <main className="min-h-screen w-full bg-[#0f1115] flex justify-center overflow-hidden select-none">
      <div className="w-full max-w-[430px] min-h-screen px-4 pt-6 pb-3 flex flex-col bg-[radial-gradient(circle_at_top,_#1a1f29_0%,_#0f1115_60%)]">
        <section className="h-[300px] flex flex-col justify-end items-center">
          <div className="h-[84px] flex flex-col justify-end items-center text-[24px] leading-[1.15] font-black text-white tabular-nums">
            {history.map((item, index) => (
              <div key={`${item.line}-${index}`} className="text-center">
                <div>{item.line}</div>
                <div>= {item.total}</div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[116px] leading-[0.9] font-black tracking-[-0.08em] text-white tabular-nums drop-shadow-[0_8px_30px_rgba(255,255,255,0.12)]">
            {score}
          </div>

          <div className="h-[48px] mt-7 text-[26px] leading-none font-black text-white text-center tabular-nums whitespace-nowrap">
            {currentThrow.length > 0 ? `-${currentThrow.join('-')}` : ''}
          </div>
        </section>

        <section className="mt-auto mb-3 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-3">
            <div />
            <button onClick={() => addValue(25)} className="h-[74px] rounded-[24px] bg-gradient-to-b from-[#34d058] to-[#179637] border border-[#53ef78] shadow-[0_10px_25px_rgba(20,140,50,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] text-white text-[25px] font-black active:scale-[0.95] active:brightness-90 transition-all duration-150 backdrop-blur-sm">
              25
            </button>
            <button onClick={() => addValue(50)} className="h-[74px] rounded-[24px] bg-gradient-to-b from-[#34d058] to-[#179637] border border-[#53ef78] shadow-[0_10px_25px_rgba(20,140,50,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] text-white text-[25px] font-black active:scale-[0.95] active:brightness-90 transition-all duration-150 backdrop-blur-sm">
              50
            </button>
            <button onClick={erase} className="h-[74px] rounded-[24px] bg-gradient-to-b from-[#ff4d5d] to-[#d90019] border border-[#ff7b87] shadow-[0_10px_25px_rgba(255,0,50,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] text-white text-[48px] font-black active:scale-[0.95] active:brightness-90 transition-all duration-150 flex items-center justify-center" aria-label="Effacer">
              ←
            </button>
          </div>

          {buttons.slice(1).map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-3">
              {row.map((value) => (
                <button key={value} onClick={() => addValue(value)} className="h-[74px] rounded-[24px] bg-gradient-to-b from-[#34d058] to-[#179637] border border-[#53ef78] shadow-[0_10px_25px_rgba(20,140,50,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] text-white text-[25px] font-black active:scale-[0.95] active:brightness-90 transition-all duration-150 backdrop-blur-sm">
                  {value}
                </button>
              ))}
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <button onClick={newGame} className="h-[82px] rounded-[28px] bg-gradient-to-b from-[#ff4d5d] to-[#d70018] border border-[#ff7d88] shadow-[0_14px_30px_rgba(255,0,40,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] text-white text-[20px] font-black tracking-[-0.02em] active:scale-[0.97] active:brightness-90 transition-all duration-150">
            Nouvelle Partie
          </button>
          <button onClick={enterThrow} className="h-[82px] rounded-[28px] bg-gradient-to-b from-[#4f4dff] to-[#1600d8] border border-[#7f84ff] shadow-[0_14px_30px_rgba(40,50,255,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] text-white text-[30px] font-black tracking-[-0.03em] active:scale-[0.97] active:brightness-90 transition-all duration-150">
            Entrée
          </button>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<FlechetteScoreApp />);
