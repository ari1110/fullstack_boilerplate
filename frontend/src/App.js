import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './features/counter/counterSlice';
import Map from './components/Map';
import './App.css';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Fullstack App Boilerplate
        </h1>
        <p>Count: {count}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <Map />
      </header>
    </div>
  );
}

export default App;