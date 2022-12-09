import {
  Button,
  ContactItem,
  Contacts,
  ContactTxt,
} from 'components/Style/Element.styled';
import { FaUserAlt } from 'react-icons/fa';
import { deleteContact } from 'redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const dispatch = useDispatch();
  const deleteContactById = contactId => {
    dispatch(deleteContact(contactId));
  };
  const contacts = useSelector(state => state.contacts);
  const searchFilter = useSelector(state => state.filter);

  const getVisibleContacts = () => {
    if (searchFilter !== '') {
      return contacts.filter(({ name }) =>
        name.toLowerCase().includes(searchFilter)
      );
    }
    return contacts;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Contacts>
      {visibleContacts.map(({ name, number, id }) => {
        return (
          <ContactItem key={id}>
            <FaUserAlt />
            <ContactTxt>
              {name} : {number}
            </ContactTxt>
            <Button type="button" onClick={() => deleteContactById(id)}>
              Delete
            </Button>
          </ContactItem>
        );
      })}
    </Contacts>
  );
};
