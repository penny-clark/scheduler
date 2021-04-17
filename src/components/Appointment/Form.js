// The Form component should track the following state:

// name:String
// interviewer:Number
// The Form component should have the following actions:

// setName:Function
// setInterviewer:Function
// The Form component should take the following props:

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function X
// onCancel:Function X

// As part of our Edit story, the Form component should take the following props:

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function
// As part of our Create story, the Form component should take the following props:

// interviewers:Array
// onSave:Function
// onCancel:Function

import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  }

  const save = function () {
    props.onSave(name, interviewer)
  }



  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
      </section>
    </section>
  </main>
  )
}

//onCancel () { back() }
// onSave () { transition(SAVING) }
//And maybe with second param: SAVING: function onComplete() { transition(SHOW) }