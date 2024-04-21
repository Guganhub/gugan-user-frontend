import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Components/Login/login';
import Home from './Components/Home/home';
import Signup from './Components/Signup/Signup';
import Admin from './Components/Admin/Admin';

import PieChart from './Components/Barchart/PieChart';

function App() {


  const [users, setUsers] = useState([]); 
  const [countsArray, setcountsArray] = useState([]); 
   useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    let cArray =[];
    try {
      const response = await fetch('https://gugan-backend.onrender.com/get-all-user', {
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
                       const obj = data.user;
                       console.log(typeof(data.user));
                       const groupedByMonth = users.filter(user => user.logindate && user.count) 
                       .reduce((acc, user) => {
                         const month = user.logindate.split('/')[1]; 
                         acc[month] = acc[month] || { total_count: 0 }; 
                         acc[month].total_count += user.count; 
                        
                         return acc;
                       }, {});
                                             
                        for (let month = 1; month <= 12; month++) {
                         if(groupedByMonth[month])
                         {
                           
                            cArray.push(groupedByMonth[month]["total_count"]);
                         }
                         else{
                          
                            cArray.push(0);
                         }
                        }
                        
                        setcountsArray(cArray)
                    
                    
                  
         
                    })
                    .catch(error => {
                      console.error('Error:', error);
                      
                    });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/bar" element={<PieChart countsArray={countsArray} />} />
    </Routes>
</BrowserRouter>
  );
}

export default App;
