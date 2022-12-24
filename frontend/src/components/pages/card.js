import React, { useState } from "react";
import Modal from "./modal";

function Card(props) {
  const [data, setData] = useState([]);
  console.log(props.data);
  const editHandler = (id) => {
    if (id) {
      const submitDetail = fetch(`http://localhost:3005/phonebook/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      let result = submitDetail.then((res) => {
        return res.json();
      });
      result.then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      alert("Please Enter a valid id");
    }
  };
  const deleteHandler = async (id) => {
    const submitDetail = await fetch(`http://localhost:3005/phonebook/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await submitDetail.json();
    if (submitDetail.status === 200) {
      props?.fetchApi();
    } else {
      console.log(result.message);
    }
  };
  return (
    <>
      <div className="card bg-light w-100">
        <div className="row">
          <table className="table">
            <thead className="w-75 vertical-align-center bg-primary text-white text-center">
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </thead>
            <tbody className="text-center">
              {props.data[0]?.map((res, index) => {
                return (
                  <>
                    <tr key={res._id}>
                      <td>{index + 1}</td>
                      <td>{res.fname + res.lname}</td>
                      <td>{res.email}</td>
                      <td>{res.phone}</td>
                      <td>{res.address}</td>
                      <td className="d-flex justify-content-around">
                        <button
                          type="submit"
                          onClick={() => editHandler(res._id)}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          className="bg-success btn"
                        >
                          Edit
                        </button>

                        <button
                          type="submit"
                          onClick={() => deleteHandler(res._id)}
                          className="bg-danger btn"
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal data={data} apiData={props.fetchApi} />
    </>
  );
}

export default Card;
