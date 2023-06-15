import { Link } from "react-router-dom";
import { CURRENTLINE, ORANGE, PURPLE, RED, CYAN } from "../../helpers/colors";
const Contact = ({ contact, removeContact }) => {
  const { fullname, mobile, email, photo, id } = contact;
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={photo}
                alt=""
                style={{
                  border: `1px solid ${PURPLE}`,
                  width: "200px",
                  height: "130px",
                  objectFit: "cover",
                }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group p-0">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی:{" "}
                  <span className="fw-bold"> {fullname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره موبایل : <span className="fw-bold">{mobile} </span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل: <span className="fw-bold">{email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/contacts/edit/${id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen"></i>
              </Link>
              <button
                onClick={() => {
                  removeContact(id, fullname);
                }}
                className="btn my-1"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
