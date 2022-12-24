import React, { useEffect, useState} from "react";
import Card from "./card"; 

function PhoneBook() {
  const [data, setData] = useState([]);  

    useEffect(()=>{
      fetchApiData();
    },[])
    const fetchApiData = async () => {
      const products = await fetch("http://localhost:3005/phonebook",{
        headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
      });
      const result = await products.json();
      setData([result]);
    };
     console.log(data);
   
  return (
    <>
    <div className="mt-4">
      <div className="row">
        <div className="col-10 offset-1">
          <h1>PhoneBook Record</h1>
          <div className="phonebook mt-5 w-100">
             {data&&<Card data={data}  fetchApi={fetchApiData}/>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PhoneBook;
