import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


function InterviewerList(props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;