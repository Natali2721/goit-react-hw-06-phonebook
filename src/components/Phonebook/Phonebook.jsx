import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/store';
import { nanoid } from 'nanoid';
import ButtonAdd from 'components/ContactForm/ButtonAdd';
import ContactForm from 'components/ContactForm/ContactForm';
import InputName from 'components/ContactForm/InputName';
import InputTel from 'components/ContactForm/InputTel';
import { LabelContact } from 'components/ContactForm/LabelContact';

export const Phonebook = () => {
  const contacts = useSelector(state => state.contacts);
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = nanoid();
  const numberInputId = nanoid();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setUserName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setUserName('');
    setNumber('');
  };

  const clickOnBtnAdd = e => {
    e.preventDefault();
    contacts.find(({ name }) => name === userName)
      ? alert(`${userName} is already in contacts.`)
      : dispatch(addContact(userName, number));
    reset();
    // console.log(this.state);
  };

  return (
    <>
      <ContactForm onSubmit={clickOnBtnAdd}>
        <LabelContact title="Name" htmlFor={nameInputId}>
          <InputName value={userName} onChange={handleChange} />
        </LabelContact>
        <LabelContact title="Number" htmlFor={numberInputId}>
          <InputTel value={number} onChange={handleChange} />
        </LabelContact>
        <ButtonAdd text="Add contact" />
      </ContactForm>
    </>
  );
};
