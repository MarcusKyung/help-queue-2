import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props){ //TicketList takes props as a parameter. These are the props passed down from TicketControl
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) => //Looping through list passed down from TicketControl
        <Ticket 
        whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          numberOfStudents={ticket.numberOfStudents}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;