// This component takes these props:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

// const displayName = function (selected) {
//   if (selected) {
//     return name
//   }
// }

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  return(
  <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  )
}