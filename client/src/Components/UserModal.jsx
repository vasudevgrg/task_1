import React, { useState, useEffect } from 'react';
import '../App.css';

const UserModal = ({ setShowModal, user, setArr }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(''); 
  const [payment, setPayment] = useState([]);
  const [file, setFile] = useState(null);
  const [section, setSection] = useState('');
  const [qualification, setQualification] = useState('');

  useEffect(() => {
    console.log(user);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      user.Addresses.map(e=>{
        setAddresses([...addresses, e]);
      })
      
      setSection(user.section);
      setQualification(user.qualification);
      setFile(user.profile_pic);
    }
  }, [user]);

  const handleCheckboxChange = (e) => {
    const selectedPayment = e.target.value;
    if (e.target.checked) {
      setPayment([...payment, selectedPayment]);
    } else {
      setPayment(payment.filter((p) => p !== selectedPayment));
    }
  };

  const handleAddAddress = () => {
    if (address.trim()) {
      setAddresses([...addresses, address]);
      setAddress('');
    }
  };

  const handleSave = () => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('file', file);
    formdata.append('section', section);
    formdata.append('qualification', qualification);
    addresses.forEach((e) => formdata.append("addresses", e));
    payment.forEach((e) => formdata.append("payments", e));
   fetch("http://localhost:5002/editUser/"+user.id,{
    method:"PUT",
    body:formdata
   }).then(e=>e.json()).then(e=>{setArr(e.users); console.log(e); setShowModal(false);});
   
  };

  const onClose=()=>{
    setShowModal(false);
  }

 

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <div className="form-group">
          <label>Enter Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Enter Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Enter Address:</label>
          <div className="address-input">
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={handleAddAddress}>Add Address</button>
          </div>
          <div className="address-list">
            {addresses.map((addr, index) => (
              <span key={index} className="address-item">
                {addr.name}
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Pick your Payment Method:</label>
          <div className="payment-options">
            <label>
              <input type="checkbox" value="upi" checked={payment.includes('upi')} onChange={handleCheckboxChange} />
              UPI
            </label>
            <label>
              <input type="checkbox" value="creditCard" checked={payment.includes('creditCard')} onChange={handleCheckboxChange} />
              Credit Card
            </label>
            <label>
              <input type="checkbox" value="debitCard" checked={payment.includes('debitCard')} onChange={handleCheckboxChange} />
              Debit Card
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Add Image:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Enter Section:</label>
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
