import React, { Suspense, useState } from "react";
import Comp from 'app2/Comp'
import { CounterContext } from 'app2/CounterContext'

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext.Provider value={{value: counter, setValue: setCounter}}>
      <div>



        <Suspense fallback="Loading widget">
          <Comp header={"Header provided from renderer with value" + counter} decreaseCounter ={() => {
            setCounter(counter - 1);
          }}/>
        </Suspense>



        <button onClick={() => {
          setCounter(counter + 1);
        }}>
          Increase counter
        </button>
        <h1>Hello, React with Webpack!</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </CounterContext.Provider>
  );
};

export default App;