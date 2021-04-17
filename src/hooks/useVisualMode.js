import React, { useState } from "react"; //not sure if I'm supposed to have this

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const newHistory = [ ...history]
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(newMode)
    setHistory(newHistory)
    setMode(newMode)
  }
  function back() {
    if(history.length > 1) {
      const newHistory = [ ...history]
      newHistory.pop()
      setHistory(newHistory)
      setMode(newHistory[newHistory.length -1])
    }
  };

  return { mode, transition, back };
}
