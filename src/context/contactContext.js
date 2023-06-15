import { createContext } from "react";
export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contacts: [],
  setContacts: () => {},
  filterContacts: [],
  setFilterContacts: () => {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
