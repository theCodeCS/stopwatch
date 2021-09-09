import React, { useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);
  const [items, setItems] = useState([]);

  function clear() {
    return (document.getElementById("clear").innerHTML = "");
  }

  function addItem() {
    let node = document.getElementById("test");
    let textContent = node.textContent;
    setItems((prevValue) => {
      return [...prevValue, textContent];
    });
  }

  React.useEffect(() => {
    let interval;

    if (timeOn) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeOn]);

  return (
    <div>
      <div className="container">
        <h1 className="header">StopWatch 1.0</h1>
        <div className="box">
          <div id="test">
            <h2 id="darker">
              <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </h2>
          </div>
          {!timeOn && time === 0 && (
            <button onClick={() => setTimeOn(true)}>START</button>
          )}

          {time > 0 && <button onClick={addItem}>SPLIT</button>}

          {timeOn && <button onClick={() => setTimeOn(false)}>STOP</button>}

          {!timeOn && time > 0 && (
            <button onClick={() => setTimeOn(true)}>RESUME</button>
          )}

          <button onClick={() => clear()}>CLEAR</button>

          {!timeOn && time > 0 && (
            <button onClick={() => setTime(0)}>RESET</button>
          )}
        </div>
        <div className="splits">
          <ul id="clear">
            {items.map((toDoItem, index) => {
              return <li key={index}>{toDoItem}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default App;
