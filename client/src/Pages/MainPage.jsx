import React, { useEffect, useState } from "react";
import "../App.css";
import UserCard from "../Components/UserCard";
import UserModal from "../Components/UserModal";

const MainPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [payment, setPayment] = useState([]);
  const [file, setFile] = useState(null);
  const [section, setSection] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");
  const [arr, setArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser]= useState(null);

  useEffect(()=>{
    fetch("http://localhost:5002/getUsers").then(e=>e.json()).then(e=>{console.log(e);setArr(e.users)});
  },[]);

  const handleAddAddress = () => {
    if (address.trim()) {
      setAddresses([...addresses, address]);
      setAddress("");
    }
  };

  const handleAddPayment = (e) => {
    const selectedPayment = e.target.value;
    if (!payment.includes(selectedPayment)) {
      setPayment([...payment, selectedPayment]);
    }
  };

  const handleRemovePayment = (method) => {
    setPayment(payment.filter((p) => p !== method));
  };

  const handleAddUser = () => {
    if (!name || !email || !section || !qualification || addresses.length === 0 || payment.length === 0) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('file', file);
    formdata.append('section', section);
    formdata.append('qualification', qualification);
    addresses.forEach((e) => formdata.append("addresses", e));
    payment.forEach((e) => formdata.append("payments", e));

    fetch("http://localhost:5002/addUser", {
      method: "POST",
      body: formdata
    })
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        
        setMessage("User added successfully!");
        setArr(e.users);
        setName("");
        setEmail("");
        setAddresses([]);
        setPayment([]);
        setQualification("");
        setSection("");
      })
      .catch(() => setMessage("Error adding user."));
  };

  return (
    <>
    <div className="main-container">
      <h1 className="title">Enter User Info</h1>
      {message && <div className="message">{message}</div>}
      <div className="form-group">
        <label>Enter Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Enter Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Enter Address:</label>
        <div className="address-input">
          <input
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleAddAddress}>Add Address</button>
        </div>
        <div className="address-list">
          {addresses.map((addr, index) => (
            <span key={index} className="address-item">{addr}</span>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Pick your Payment Method:</label>
        <select onChange={handleAddPayment}>
          <option value="">Select Payment Method</option>
          <option value="upi">UPI</option>
          <option value="creditCard">Credit Card</option>
          <option value="debitCard">Debit Card</option>
        </select>
        <div className="payment-list">
          {payment.map((method, index) => (
            <div key={index} className="payment-item">
              {method}
              <button onClick={() => handleRemovePayment(method)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Add Image:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className="form-group">
        <label>Enter Section:</label>
        <input type="text" onChange={(e) => setSection(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Qualification:</label>
        <input type="text" onChange={(e) => setQualification(e.target.value)} />
      </div>
      <button onClick={handleAddUser}>Add User</button>
    </div>

    {
        arr.map(e=><UserCard user={e} setShowModal={setShowModal} setUser={setUser} setArr={setArr}/>)
    }
    {showModal && (
        <UserModal user={user} setShowModal={setShowModal} setArr={setArr}
        />
      )}
    </>
  );
};

export default MainPage;
