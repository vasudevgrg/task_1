import React from 'react';
import '../App.css';

const UserCard = ({ user, setShowModal, setUser, setArr}) => {
  const handleDelete=(id)=>{
    fetch(`http://localhost:5002/deleteUser/${id}`,{
      method:"DELETE"
    }).then(e=>e.json()).then(e=>setArr(e.users));
  }

  const handleEdit=()=>{
    setUser(user);
    setShowModal(true);
    
  }
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Section:</strong> {user.section}</p>
      <p><strong>Qualification:</strong> {user.qualification}</p>
      <p><strong>Addresses:</strong></p>
      <ul>
        {user.Addresses.map((address, index) => (
          <li key={index}>{address.name}</li>
        ))}
      </ul>
      <p><strong>Payment Methods:</strong></p>
      <ul>
        {user.Payments.map((payment, index) => (
          <li key={index}>{payment.name}</li>
        ))}
      </ul>
      {user.profile_pic && (
        <div>
          <img src={"http://localhost:5002/image/"+user.profile_pic} alt="Profile" style={{height:"200px", width:"200px"}} />
        </div>
      )}
      <button onClick={()=>handleDelete(user.id)}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default UserCard;
