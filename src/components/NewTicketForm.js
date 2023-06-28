import React from "react";
import { v4 } from 'uuid'; // new code
import PropTypes from "prop-types";

function NewTicketForm(props){ 
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      numberOfStudents: parseInt(event.target.numberOfStudents.value),
      id: v4()
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
        <input
          type='text'
          name='location'
          placeholder='Location' />
        <textarea
          name='issue'
          placeholder='Describe your issue.' />
        <textarea
          name='numberOfStudents'
          placeholder='How many students?' />
        <button type='submit'>Help!</button>
      </form>
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func //This is passed from TicketControl as a prop
};


export default NewTicketForm;