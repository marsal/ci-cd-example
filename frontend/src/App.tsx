import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

type Counter = {
  id: number;
  count: number;
};
const fetchCounter = async (): Promise<Counter> => {
  const response = await fetch('/api/counter');
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa');
  }

  const counter = await response.json();
  return counter as Counter;
};
const fetchIncrease = async (counter: Counter): Promise<Counter> => {
  const response = await fetch(`/api/counter/${counter.id}/increase`);
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa');
  }

  const newCounter = await response.json();
  return newCounter as Counter;
};
const fetchDecrease = async (counter: Counter): Promise<Counter> => {
  const response = await fetch(`/api/counter/${counter.id}/decrease`);
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa');
  }

  const newCounter = await response.json();
  return newCounter as Counter;
};
function App() {
  const [counter, setCounter] = useState<Counter | null>(null);

  useEffect(() => {
    const get = async () => {
      setTimeout(async () => {
        const result = await fetchCounter();
        setCounter(result);
      }, 0);
    };
    get();
  }, []);

  const increaseCounter = async () => {
    const newCounter = await fetchIncrease(counter as Counter);
    setCounter(newCounter);
  };
  const decreaseCounter = async () => {
    const newCounter = await fetchDecrease(counter as Counter);
    setCounter(newCounter);
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!counter && <h3>Loading</h3>}
        {counter && (
          <>
            <p>count is {counter.count}</p>
            <button onClick={() => increaseCounter()}>Increase</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => decreaseCounter()}>Decrease</button>
          </>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
