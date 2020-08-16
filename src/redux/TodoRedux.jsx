import React from "react";
import { connect } from "react-redux";
import TodoInput from "./TodoInput";

class TodoRedux extends React.Component {
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <TodoInput />
        <ul>
          {this.props.todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapState)(TodoRedux);
