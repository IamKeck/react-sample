export type State = {
  name: string;
  age: number;
};
export const initialState = {
  name: "",
  age: 0,
};
export type Action =
  | {
      type: "nameInput";
      value: string;
    }
  | {
      type: "ageInput";
      value: number;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "nameInput":
      return {
        ...state,
        name: action.value,
      };
    case "ageInput":
      return {
        ...state,
        age: action.value,
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      // eslint-disable-next-line no-throw-literal
      throw "error";
  }
};

type Props = {
  state: State;
  dispatch: (a: Action) => void;
};

export const View: React.VFC<Props> = ({ state, dispatch }) => {
  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "nameInput", value: e.target.value });
  };
  const onAgeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "ageInput", value: parseInt(e.target.value) });
  };
  return (
    <div>
      <div>
        name: <input type="text" value={state.name} onChange={onNameChange} />
      </div>
      <div>
        age: <input type="number" value={state.age} onChange={onAgeChange} />
      </div>
    </div>
  );
};
