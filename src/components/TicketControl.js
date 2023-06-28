import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

//class component so we use methods not functions

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { //called state slices
      formVisibleOnPage: false, //Local State
      mainTicketList: [], // Shared State
      selectedTicket: null,
      editing: false
    };
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
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
        selectedTicket: null,
        editing: false
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

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList //filter previous version of ticket out of list then add edited version of list with Concat(). This way we don't mutate tickets
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false, //set editing back to false
        selectedTicket: null //set back to null so TicketList component is showing
      });
  }  

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
      ticket={this.state.selectedTicket} 
      onClickingDelete={this.handleDeletingTicket}
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} ticketList={this.state.mainTicketList} />;
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );

  }
}  

export default TicketControl;