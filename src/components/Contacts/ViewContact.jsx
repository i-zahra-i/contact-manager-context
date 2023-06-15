import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";
import { getContact, getGroup } from "../../services/contactService";
import { Spinner } from "../";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";

const ViewContact = () => {
  const { loading, setLoading } = useContext(ContactContext);
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { contactId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.id);
        setLoading(false);
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const { contact, group } = state;
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center pt-2">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3 d-flex flex-column">
                    <div className=" col-12">
                      <img
                        src={contact.photo}
                        alt=""
                        className="img-fluid rounded"
                        style={{ border: `1px solid ${PURPLE}` }}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <Link
                        to={"/contacts"}
                        className="btn"
                        style={{ backgroundColor: PURPLE, width: "100%" }}
                      >
                        برگشت به صفحه اصلی
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group p-0 ">
                      <li className="list-group-item list-group-item-dark text-center">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark text-center">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark text-center">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark text-center">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark text-center">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
