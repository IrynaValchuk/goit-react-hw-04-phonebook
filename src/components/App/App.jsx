import { useState, useEffect } from 'react';
import { ContactForm, ContactList, Filter } from 'components';
import css from 'components/App/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contactData => {
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );

    if (isContact) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }

    setContacts([contactData, ...contacts]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p className={css.info}>There are no contacts</p>
      ) : (
        <>
          <Filter filter={filter} onChangeFilter={handleChangeFilter} />
          <ContactList
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
          />
        </>
      )}
    </div>
  );
};
