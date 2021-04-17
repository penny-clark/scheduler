//interviewerList props
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {
  const interviewermap = props.interviewers.map(value => {
    return (
      <InterviewerListItem
        key={value.id}
        id={value.id}
        name={value.name}
        avatar={value.avatar}
        selected={value.id === props.value}
        setInterviewer={() => props.onChange(value.id)}
      />
    );
  });

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewermap}</ul>
    </section>)
}