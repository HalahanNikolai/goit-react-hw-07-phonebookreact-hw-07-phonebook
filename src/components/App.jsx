import React, { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { toast } from 'react-toastify';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };
    componentDidMount() {
    const contactsFromLS = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLS);
    if (!parsedContacts) return;
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
 addContact = newContact => {
    const { contacts } = this.state;

    contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? toast.error(`${newContact.name}: is already in contacts`, notifyOptions)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

changeFilter = e => {
    this.setState({ filter: e.target.value.toLowerCase().trim() });
  };

getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
};
  
  render() {
      const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return ( 
    <div className={css.container}>
        <h1>Phoneboock</h1>
        <ContactForm onAddContact={this.addContact} />

       <div style={{
          height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        margin: '0 auto',
        color: '#010101'
      }}>
        <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter} />
          <ContactList onDelete={this.deleteContact} contacts={visibleContacts} />
        </div> 
    </div>
  );
  };
  // test
  






}