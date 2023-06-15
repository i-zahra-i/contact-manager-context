import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/contactContext";
import { ToastContainer, toast } from "react-toastify";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";
import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFilterContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);
        setFilterContacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const createContactForm = async (values) => {
    try {
      setLoading((pervLoading) => !pervLoading);
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("اوکی اضافه شد");
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilterContacts(allContacts);
        setLoading((pervLoading) => !pervLoading);
        navigate("/contacts");
      }
    } catch (err) {
      setLoading((pervLoading) => !pervLoading);
      console.log(err);
    }
  };

  let filterTimeout;
  const contactSearch = (query) => {
    clearTimeout(filterTimeout);
    if (!query) return setFilterContacts([...contacts]);
    filterTimeout = setTimeout(() => {
      setFilterContacts(
        contacts.filter((contact) => {
          return contact.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 1000);
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updateContacts = contacts.filter(
        (c) => c.id !== parseInt(contactId)
      );
      setContacts(updateContacts);
      setFilterContacts(updateContacts);
      const { status } = await deleteContact(contactId);
      if (status !== 200) {
        setContacts(allContacts);
        setFilterContacts(allContacts);
      }
      toast.error("حذف شد! حالا خوبت شد :/");
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilterContacts(allContacts);
    }
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        setContacts,
        filterContacts,
        setFilterContacts,
        groups,
        contactSearch,
        createContact,
        deleteContact: confirmDelete,
        createContact: createContactForm,
      }}
    >
      <div>
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
