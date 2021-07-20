import { useState } from 'react';
import ContactForm from './components/ContactForm/Form.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Filter from './components/Filter/Filter.jsx';
import contactsList from './data/contacts.json';
import useLocalStorage from './hooks/LocalStorage.jsx';
import shortid from 'shortid';
import styles from './App.module.css';

export default function PhoneBookApp() {
  const [contacts, setContacts] = useLocalStorage('contacts', contactsList);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const handleFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div>
      <h1 className={styles.mainTitle}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList
        contacts={handleFilteredContacts()}
        deleteContacts={deleteContacts}
      />
    </div>
  );
}

// ***Old logic with class ***///
// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     if (this.state.contacts.find(user => user.name === name)) {
//       console.log(alert(`${name} is already in contacts`));
//       return;
//     }

//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };

//   deleteContacts = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     // console.log('App componentDidMount');
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     // console.log(parsedContacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log('componentDidUpdate');

//     if (this.state.contacts !== prevState.contacts) {
//       // console.log('Contacts field updated');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//     // console.log(prevState);
//     // console.log(this.state);
//   }

//   onFilterChange = event => {
//     this.setState({
//       filter: event.currentTarget.value,
//     });
//   };

//   handleFilteredContacts = () => {
//     const normalizedFilter = this.state.filter.toLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   render() {
//     const filteredContacts = this.handleFilteredContacts();

//     return (
//       <div>
//         <h1 className={styles.mainTitle}>Phonebook</h1>
//         <ContactForm addContact={this.addContact} />
//         <h2 className={styles.contactsTitle}>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.onFilterChange} />
//         <ContactList
//           contacts={filteredContacts}
//           deleteContacts={this.deleteContacts}
//         />
//       </div>
//     );
//   }
// }

// export default App;
