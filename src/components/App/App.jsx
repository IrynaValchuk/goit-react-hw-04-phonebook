import React, { Component } from 'react';
import { ContactForm, ContactList, Filter } from 'components';
import css from 'components/App/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = contactData => {
    const { contacts } = this.state;
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );

    if (isContact) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [contactData, ...contacts] }));
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        {contacts.length === 0 ? (
          <p className={css.info}>There are no contacts</p>
        ) : (
          <>
            <Filter filter={filter} onChangeFilter={this.handleChangeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDelete={this.handleDeleteContact}
            />
          </>
        )}
      </div>
    );
  }
}
