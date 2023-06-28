import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';

//class component so we use methods not functions

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { //called state slices
      formVisibleOnPage: false, //Local State
      mainTicketList: [], // Shared State
      selectedTicket: null
    };
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id); //filters everything that doesn't have the ticketID that will be passed to method
    this.setState({
      mainTicketList: newMainTicketList, //mainTicketList is set to newMainTicketList from above
      selectedTicket: null //set back to null so TicketList component is showing
    })
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
  
  handleAddingNewTicketToList = (newTicket) => { //takes newTicket as parameter
    const newMainTicketList = this.state.mainTicketList.concat(newTicket); //
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
  } 

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0]; //using filter to find the ticket with the matching id. Filter returns an array so we take the first index element
    this.setState({selectedTicket: selectedTicket}); //use that to change the state of selectedTicket
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket}/>
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.state.formVisibleOnPage) {
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
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