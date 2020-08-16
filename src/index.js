import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./App.css";
import styled from "styled-components";
import TodoRedux from "./redux/TodoRedux";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";

const store = createStore(reducer);

function Hello(props) {
  return <h1 alt={"test"}>With JSX {props.title}</h1>;
}

function Items({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // var numbers = /^[+-]?\d+(\.\d+)?$/;
      // if (event.target.value.match(numbers)) {
      this.setState({ items: [...this.state.items, event.target.value] });
      // } else {
      // this.setState({ items: [...this.state.items, "not number"] });
      // }
    }
  };

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleKeyDown} />
        <ul>
          {this.state.items.map((text, index) => (
            <li key={index}>
              {Number.isNaN(Number(text)) ? "Not" : ""} Number
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class InputComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName } = this.state;
    const name = `${firstName} ${lastName}`.trim();
    if (this.props.handleName) {
      this.props.handleName(name);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
        />
        <input
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
        />
        <button type="submit">submit</button>
      </form>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
    };

    this.handleClickEvent = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((p) => ({ isToggleOn: !p.isToggleOn }));
  }

  render() {
    return (
      <button onClick={this.handleClickEvent}>
        {this.state.isToggleOn ? "On" : "Off"}
      </button>
    );
  }
}

class HelloComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      title: "x",
      etc: "",
    };
  }

  add = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  render() {
    const items = [];

    for (let i = 1; i <= this.state.count; i++) {
      items.push(i % 2 === 0 ? "even" : "odd");
    }

    if (this.state.count === 10) {
      return null;
    }

    return (
      <div>
        <Hello title="cic" />
        <Hello title="cic" />
        <InputComp />
        <InputComponent />
        {/* {this.state.count % 2 === 0 && <h1>is mod 2</h1>} */}
        <p>
          {this.props.title} : {this.state.count}
        </p>
        <button onClick={this.add}>add</button>
        <Items items={items} />
        <ul>
          {items.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App2 extends React.Component {
  state = {
    name: "",
    count: 0,
  };

  handleName = (name) => {
    this.setState({ name });
  };

  render() {
    const name = `${this.state.name}`.trim();
    const header = name ? <h1>Hello {name}</h1> : null;
    return (
      <>
        {header}
        <InputComp handleName={this.handleName} />
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          add
        </button>
        {this.state.count < 10 && <LifeCycle count={this.state.count} />}
      </>
    );
  }
}

class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      name: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    console.log(props, state);
    return {
      name: props.count % 2 === 0 ? "event" : "odd",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // ให้ render ไหม?
  shouldComponentUpdate(props, state) {
    console.log("shouldComponentUpdate");
    console.log(props.count, state);
    if (props.count > 5) {
      return false;
    }
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return {
      count: prevProps.count,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}

function CompositionExample(props) {
  return props.children;
}

function Composition() {
  const isEvent = parseInt(Math.random() * 10, 10) % 2 === 0;
  const ele = isEvent ? <h2>Even</h2> : <h2>Odd</h2>;
  return (
    <>
      <h1>{ele}</h1>
      <CompositionExample>{ele}</CompositionExample>
    </>
  );
}

const ColorContext = React.createContext({});
const FontSizeContext = React.createContext({});

function ToggleTodoButton() {
  return (
    <ColorContext.Consumer>
      {(context) => {
        return <button onClick={context.toggleColor}>{context.color}</button>;
      }}
    </ColorContext.Consumer>
  );
}

class Todo extends React.Component {
  static contextType = ColorContext;

  render() {
    return (
      <ColorContext.Consumer>
        {({ color }) => {
          return (
            <FontSizeContext.Consumer>
              {({ fontSize }) => {
                return (
                  <p style={{ color, fontSize: fontSize + "px" }}>
                    {this.props.title}
                  </p>
                );
              }}
            </FontSizeContext.Consumer>
          );
        }}
      </ColorContext.Consumer>
    );
  }
}

function TodoList() {
  return (
    <div>
      <Todo title={"Todo 1"} />
      <Todo title={"Todo 2"} />
      <ToggleTodoButton />
    </div>
  );
}

class App3 extends React.Component {
  state = {
    color: "pink",
    fontSize: 30,
    count: 0,
    toggleColor: () => {
      this.setState(({ color }) => ({
        color: color === "pink" ? "green" : "pink",
      }));
    },
  };
  render() {
    const { color, fontSize, count, toggleColor } = this.state;
    if (count > 5) {
      throw Error("XXX");
    }
    return (
      <ColorContext.Provider value={{ color, toggleColor }}>
        <FontSizeContext.Provider value={{ fontSize }}>
          <TodoList />
          {count < 5 && <Example title={"Hello"} />}
          <button onClick={() => this.setState({ count: count + 1 })}>
            {count}
          </button>
        </FontSizeContext.Provider>
      </ColorContext.Provider>
    );
  }
}

class ErrorBoundaries extends React.Component {
  state = {
    isError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      isError: true,
    };
  }

  render() {
    return (
      <>
        {this.state.isError ? (
          <div>Something when wrong.</div>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

class AppX extends React.Component {
  render() {
    return (
      <ErrorBoundaries>
        <App3 />
      </ErrorBoundaries>
    );
  }
}

function Hello2() {
  return <h1>Hello World!</h1>;
}

const withLoadingComponent = (WrappedComponent) => {
  return class ComponentLoading extends React.Component {
    render() {
      if (this.props.isLoading) {
        return <div>Loading</div>;
      }
      return <WrappedComponent />;
    }
  };
};

const LoadingComponent = withLoadingComponent(Hello2);

function reducer2(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

// custom hook
function useCountName(count, title) {
  return [title + " " + count];
}

function Example(props) {
  const [count, dispatchCount] = useReducer(reducer2, 0);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const { color } = useContext(ColorContext);
  const { fontSize } = useContext(FontSizeContext);

  // custom hook
  // const [countName] = useCountName(count, title);
  const countName = useCallback((a) => title + " " + count + a, [title, count]);

  // watch [] do at fst time only
  useEffect(() => {
    console.log("call api");
    const interval = setInterval(() => {
      console.log("xx");
    }, 2000);
    // when component destroy
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   setName(title + " " + count);
  // }, [title]);

  useEffect(() => {
    setName(title + " " + count);
  }, [title, setName]);

  return (
    <div>
      <p>{countName(1)}</p>
      <p style={{ color, fontSize: fontSize + "px" }}>{name}</p>
      <p>This is title: {title}</p>
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <p>{count}</p>
      <button onClick={() => dispatchCount({ type: "increment" })}>+</button>
      <button onClick={() => dispatchCount({ type: "decrement" })}>-</button>
    </div>
  );
}

const ItemXList = styled.li`
  color: ${(props) => (props.color ? props.color : "blue")};
  font-size: 20px;
`;

const ItemXListPlus = styled(ItemXList)`
  background-color: pink;
  :hover {
    background-color: green;
  }
`;

function ExamHook() {
  const [items, setItems] = useState([]);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      setItems([...items, value]);
      event.target.value = "";
    }
  };

  return (
    <>
      <input onKeyUp={(event) => handleKeyUp(event)} />
      <ul>
        {items.map((item, index) => (
          <ItemXListPlus color={"red"} key={index}>
            {item}
          </ItemXListPlus>
        ))}
      </ul>
    </>
  );
}

// auto check state and props
class App5 extends React.PureComponent {
  state = {
    count: 1,
  };

  // not do this when extends PureComponent
  shouldComponentUpdate(props, state) {
    return this.state.count !== state.count;
  }
}

function MemoComponent(props) {
  // print only once.
  console.log(props);

  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

const MMComponent = React.memo(MemoComponent)
class App6 extends React.Component {
  state = {
    name: "test",
    age: 20,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(({ age }) => ({ age: 30 }));
    }, 1000);
  }
  render() {
    return (
      <div>
        <MMComponent name={this.state.name} age={this.state.age} />
      </div>
    );
  }
}

ReactDOM.render(
  // <React.StrictMode>
  <App6 />,
  // <Provider store={store}>
  //   <TodoRedux />
  // </Provider>,

  // <LoadingComponent isLoading={false} />,
  // <Composition />,
  // <Toggle />
  // <Hello title="Hello Function" />
  // <HelloComponent title={"Hello Component"} />
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
