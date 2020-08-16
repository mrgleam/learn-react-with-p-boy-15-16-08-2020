import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

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
    count:  0
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
        <button onClick={() => this.setState({count : this.state.count + 1})}>add</button>
        {this.state.count < 10 && <LifeCycle count={this.state.count}/>}
      </>
    );
  }
}

class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      name: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    console.log(props, state);
    return {
      name: props.count % 2 === 0 ? 'event' : 'odd'
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
      count: prevProps.count
    }
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

ReactDOM.render(
  // <React.StrictMode>
  <App2 />,
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
