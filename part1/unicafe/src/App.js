import React, { useState } from "react";
import { notes } from "./db";

const Note = ({ id, content, date }) => {
  return notes.map((note) => {
    return (
      <li>
        <p>{note.content}</p>
        <time>
          <small>{note.date}</small>
        </time>
      </li>
    );
  });
};

const App = () => {
  return (
    <>
      <h1>Hello World!</h1>
      <ul>
        <Note />
      </ul>
    </>
  );
};

export default App;
