import React, { useState } from "react"; //not sure if I'm supposed to have this

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop()
      history.push(newMode)
      setMode(newMode)
    } else {
    history.push(newMode)
    setMode(newMode)
    }
  }
  function back() {
    if(history.length > 1) {
    history.pop()
    setMode(history[history.length -1])
    }
  };

  return { mode, transition, back };
}