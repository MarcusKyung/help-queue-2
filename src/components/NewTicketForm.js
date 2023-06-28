import React from "react";
import { v4 } from 'uuid'; // new code
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props){ 
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      id: v4()
    });
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func //This is passed from TicketControl as a prop
};


export default NewTicketForm;