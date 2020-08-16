import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoInput() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const onKeyup = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      dispatch({ type: "ADD", payload: value });
      event.target.value = "";
    }
  };
  return (
    <>
      {todos.map((todo) => (
        <p>{todo}</p>
      ))}
      <input onKeyUp={onKeyup} />
    </>
  );
}
