import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import { useContext } from "react";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { loading, deleteContact, filterContacts } = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  to="/contacts/add"
                  className="btn m-2"
                  style={{ backgroundColor: PINK }}
                >
                  ساخت مخاطب جدید<i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filterContacts.length > 0 ? (
              filterContacts.map((c) => (
                <Contact key={c.id} contact={c} removeContact={deleteContact} />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt=" پیدا نشد "
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
