import React, { useEffect, useRef,useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
const PieChart = (props) => {
  console.log("222");
  console.log(props)
  const chartRef = useRef(null);
  const [users, setUsers] = useState([]); 
   const navigate = useNavigate();
  let role = useSelector((state) => state.role);

  const [countsArray, setcountsArray] = useState([]); 
  role = role.replace(/"/g, '');
  // useEffect(() => {
  //   fetchData();
  // }, []);
  if (role !== 'Admin') {
    navigate("/");
  }
  
  // const fetchData = async () => {
  //   let cArray =[];
  //   try {
  //     const response = await fetch('http://localhost:5000/get-all-user', {
  //                   method: 'POST',
  //                   headers: {
  //                     'Content-Type': 'application/json',
  //                   },
                   
  //                 })
  //                 .then(response => {
  //                     if (!response.ok) {
  //                      alert("Invalid credentials");
  //                     }
  //                     return response.json(); 
  //                   })
  //                   .then(data => {
  //                     console.log('Data received:', data);
  //                     setUsers(data.user);
  //                      const obj = data.user;
  //                      console.log(typeof(data.user));
  //                      const groupedByMonth = users.filter(user => user.logindate && user.count) // Filter users with login date and count
  //                      .reduce((acc, user) => {
  //                        const month = user.logindate.split('/')[1]; // Extract month from login date
  //                        acc[month] = acc[month] || { total_count: 0 }; // Create object for the month if it doesn't exist
  //                        acc[month].total_count += user.count; // Add count to the total count for the month
                        
  //                        return acc;
  //                      }, {});
                      
                       
  //                       for (let month = 1; month <= 12; month++) {
  //                        if(groupedByMonth[month])
  //                        {
                           
  //                           cArray.push(groupedByMonth[month]["total_count"]);
  //                        }
  //                        else{
                          
  //                           cArray.push(0);
  //                        }
  //                       }
  //                       setcountsArray(cArray)
                    
                    
                  
         
  //                   })
  //                   .catch(error => {
  //                     console.error('Error:', error);
                      
  //                   });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const chartData = {
    labels:  [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ],
    datasets: [{
      label: 'Data',
      data: props.countsArray, 
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1,
    }],
  };
  const chartOptions = {
    maintainAspectRatio: true, 
    aspectRatio: 2.5, 
    scales: {
      y: {
        type: 'category', 
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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
        {countsArray && (

    <div className="container padding-10">
      <h1 className="text-center">Monthly Login</h1>
      
       <Pie data={chartData} options={chartOptions} />;
    </div>)

}
 </div>
  );
};

export default PieChart;
