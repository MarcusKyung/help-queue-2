import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props){ //TicketList takes props as a parameter. These are the props passed down from TicketControl
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket, index) => //Looping through list passed down from TicketControl
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          numberOfStudents={ticket.numberOfStudents}
          key={index}/>
      )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;