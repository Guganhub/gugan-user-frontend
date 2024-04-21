import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);  const navigate = useNavigate();
  let role = useSelector((state) => state.role);
  role = role.replace(/"/g, '');
  useEffect(() => {
  if (role !== 'Admin') {
    navigate("/");
  }
  else{
    try {
         fetch('https://gugan-backend.onrender.com/get-all-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
           
          })
          .then(response => {
              if (!response.ok) {
               alert("Invalid credentials");
              }
              return response.json(); 
            })
            .then(data => {
              console.log('Data received:', data);
              setUsers(data.user);
            })
            .catch(error => {
              console.error('Error:', error);
              
            });
         
        } catch (error) {
          console.error('Error posting data:', error);
        }
      
    
}}, [])
;

  return (
    <div>
         <div className="container mt-5">
            <div className="row justify-content-start">
                <div className="col-auto">          
                    <Link to="/">
                        <button className="btn btn-primary mr-2">
                            back
                        </button>
                    </Link>
                </div>
            
            </div>
        </div>
    <div className="center-table center-container">
    <div className="container">
      <h2>User Table</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Count</th>
            <th>Last Login</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.count}</td>
              <td>{user.logindate}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default Admin;
