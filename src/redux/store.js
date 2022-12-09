import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';
const INITIAL_CONTACTS = [
  { id: nanoid(6), name: 'Rosie', number: '122-12-12' },
  { id: nanoid(6), name: 'Hermione', number: '433-43-43' },
  { id: nanoid(6), name: 'Ark', number: '655-65-65' },
  { id: nanoid(6), name: 'Ann', number: '277-77-77' },
];
export const addContact = createAction('contacts/add', (name, number) => {
  return {
    payload: {
      id: nanoid(),
      name,
      number,
    },
  };
});

export const deleteContact = createAction('contacts/delete');
export const filterContact = createAction('contacts/filter');

const items = createReducer(INITIAL_CONTACTS, {
  [addContact.type]: (state, action) =>
    state.find(option => option.name === action.payload.name)
      ? alert(`${action.payload} is already in contacts.`)
      : [...state, action.payload],
  [deleteContact.type]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
});

// Више проверку лучше оставить не в редаксе!!!

const filter = createReducer('', {
  [filterContact.type]: (_, action) => action.payload.toLowerCase(),
});

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducer: {
//     add(state, action) {
//       state.push(action.payload);
//     },
//     remove(state, action) {
//       return state.filter(contact => contact.id !== action.payload);
//     },
//   },
// });

// export const { add, remove } = contactSlice;

export const store = configureStore({
  reducer: {
    contacts: items,
    filter: filter,
  },
});
// const initial_state = {
//   contacts: {
//     items: [],
//     filter: '',
//   },
// };
