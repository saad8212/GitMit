import React, { useState } from "react"; 
import { useNavigate} from "react-router-dom";
function CreatePhone() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [fname, setfName] = useState();
  const [lname, setlName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const auth = localStorage.getItem("user"); 
  const submitData = async (event) => {
    setErr(null);
    event.preventDefault();  
    if(!fname || !lname || !email || !phone || !address) {
      setErr(true);
      console.log("error");
      return false;
    }
    
      const submit_data = await fetch("http://localhost:3005/phonebook", {
        method: "POST",
        body: JSON.stringify({
          fname,
          lname,
          email,
          phone,
          address,
          userId:JSON.parse(auth)?._id
        }),
      headers: { 'Content-Type': 'application/json',
              authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
      });
      console.log(submit_data);
      const result = await submit_data.json();
      console.log("result", result);
      if (submit_data.status === 200) {
        console.log(result);
        navigate("/");
    } else {
      console.log(result);
    }
  };
  return (
    <div className="formSection main">
      <div className="container">
        <div className=" headings text-center">
          <h1>Create Product</h1>
          </div>
        <div className="row mt-4">
          <div className="col-lg-8 col-md-8 col-10 offset-lg-2 offset-md-2 offset-1">
            <form id="makeTodo" onSubmit={submitData}>
              <div className="form-group mt-5">
                <input
                  type="text"
                  onChange={(e)=>setfName(e.target.value)}
                  className="form-control"
                  placeholder="Enter First Name..."
                />
              </div>
              {err && !fname && <span className="text-danger danger-text">"First Name is not valid"</span> }
              <div className="form-group mt-3">
                <input
                  type="text"
                  onChange={(e)=>setlName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Last Name..."
                />
              </div>
              {err && !lname && <span className="text-danger danger-text">"Last Name is not valid"</span> }
              <div className="form-group mt-3">
                <input
                onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Enter Email..."
                />
              </div>
              {err && !email && <span className="text-danger danger-text">"Email is not valid"</span> }
              <div className="form-group mt-3">
                <input
                onChange={(e)=>setPhone(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="Enter Phone Number..."
                />
              </div>
              {err && !phone && <span className="text-danger danger-text">"Phone is not valid"</span> }
              <div className="form-group mt-3">
                <input
                onChange={(e)=>setAddress(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="Enter Address..."
                />
              </div>
              {err && !address && <span className="text-danger danger-text">"Address is not valid"</span> }
              <div className="form-button d-flex justify-content-center mt-5">
                <button type="submit" class="btn btn-info p-2">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePhone;
