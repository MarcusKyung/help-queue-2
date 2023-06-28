import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

//class component so we use methods not functions

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: [] // new code
    };
  }


  handleClick = () => {
    this.setState({formVisibleOnPage: true});
  }
  
  handleAddingNewTicketToList = (newTicket) => { //takes newTicket as parameter
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} /> 
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />; 
      buttonText = "Add Ticket"; 
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
        <p>{this.state.count}</p>
      </React.Fragment>
    );
  }
}  

export default TicketControl;