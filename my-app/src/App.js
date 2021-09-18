import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);
  const [items, setItems] = useState([]);

  function clear() {
    return (document.getElementById("clear").innerHTML = "");
  }

  function addItem() {
    let node = document.getElementById("test").textContent;
    setItems((prevValue) => {
      return [...prevValue, node];
    });
  }

  useEffect(() => {
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
          <ol id="clear">
            {items.map((toDoItem, index) => {
              return <li key={index}>{toDoItem}</li>;
            })}
          </ol>
        </div>

      </div>
    </div>
  );
}


export default App;

// other things to improve on: 
// 1. need to wrap around text (<li>)
// 2. implement some flexbox/grid functionality
// 3. implement clock/time to correlate time with stopwatch
