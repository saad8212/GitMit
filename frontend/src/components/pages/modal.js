import React, {useEffect, useState } from "react"; 
function Modal(props) {
  const [err, setErr] = useState(null);
  const [fname, setfName] = useState();
  const [lname, setlName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState(); 
 
 
 console.log(props);
  useEffect(() => {
    setfName(props.data?.fname);
    setlName(props.data?.lname);
    setEmail(props.data?.email);
    setPhone(props.data?.phone);
    setAddress(props.data?.address);
  }, [props.data]);

  const updateDirectory = async (event) => {
    event.preventDefault();
    setErr(null);
    if (fname&&lname&&email&&phone&&address) {
      let update_data = await fetch(`http://localhost:3005/phonebook/${props.data._id}`,{
        method:"PUT",
        body:JSON.stringify({
          fname,lname, email, phone, address
        }),
        headers:{ 'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
      });  
      let result = await update_data.json();
      if (result){
        props.apiData([result]);
      } else {
        setErr(result.message);
      }
    } else {
      setErr("All fields are compulsory");
    } 
    } 
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Update {props.data?.fname}
              </h5>
              <span>{err ? err : ""}</span>
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form id="makeTodo">
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" value={fname} onChange = {(e) =>setfName(e.target.value)} class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={lname} onChange = {(e) =>setlName(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email} onChange = {(e) =>setEmail(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={phone} onChange = {(e) =>setPhone(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={address} onChange = {(e) =>setAddress(e.target.value)}
                      class="form-control"
                    />
                  </div>
                  <div className="form-button text-center">
                    <button
                      type="submit" 
                      className="btn btn-dark" 
                      onClick={updateDirectory}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
