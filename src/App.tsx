import React, { useReducer } from "react";
import "./App.css";
import * as SubComponent from "./SubComponent";

type State = {
  counter: number;
  subComponentState: SubComponent.State;
};

const initialState: State = {
  counter: 0,
  subComponentState: SubComponent.initialState,
};
type Action =
  | {
      type: "increment";
    }
  | { type: "decrement" }
  | { type: "subComponent"; value: SubComponent.Action };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "subComponent":
      return {
        ...state,
        subComponentState: SubComponent.reducer(
          state.subComponentState,
          action.value
        ),
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onPlusClicked = () => {
    dispatch({ type: "increment" });
  };
  const onMinusClicked = () => {
    dispatch({ type: "decrement" });
  };

  const subComponentDispatch = (a: SubComponent.Action) => {
    dispatch({ type: "subComponent", value: a });
  };

  return (
    <div className="App">
      <div style={{ border: "1px solid black" }}>
        <h1>main component</h1>
        <div>current counter: {state.counter}</div>
        <div>
          <button onClick={onPlusClicked}>+</button>
          <button onClick={onMinusClicked}>-</button>
        </div>
      </div>
      <div style={{ border: "1px solid black" }}>
        <h1>sub component</h1>
        <SubComponent.View
          dispatch={subComponentDispatch}
          state={state.subComponentState}
        />
      </div>
    </div>
  );
}

export default App;
