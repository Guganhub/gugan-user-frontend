import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Store/action';
import "./login.css";
function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
          }
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Please enter your first name';
          }
         
          if (!formData.email) {
            newErrors.email = 'Please enter your email';
          }
          if (!formData.password.trim()) {
            newErrors.password = 'Please enter your password';
          } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
          }
         
          setErrors(newErrors);
      
          if (Object.keys(newErrors).length === 0) {
      try {
      await fetch('https://gugan-backend.onrender.com/get-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
             alert("Invalid credentials");
            }
            return response.json(); 
          })
          .then(data => {
            console.log('Data received:', data);
            dispatch(setUser(data.user));
            if(data.user.role === "Admin"){
            navigate('/');
            }
            else{
                navigate('/')  
            }
          
          })
          .catch(error => {
            console.error('Error:', error);
            
          });
       
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
    };

    return (
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} id="form">
                   
                    <div className="form-group ">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                
                            />
                             {errors.name && <span className='error' >{errors.name}</span>}
                        </div>
                        <div className="form-group  mt-4">
                            <label htmlFor="email">Email ID</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                
                            />
                             {errors.email && <span className='error' >{errors.email}</span>}
                        </div>
                        <div className="form-group  mt-4">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                
                            />
                              {errors.password && <span className='error' >{errors.password}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
