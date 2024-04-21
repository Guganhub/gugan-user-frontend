
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        count:0,
        logindate: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            logindate:dateString,
       
        }));
       
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
          }
    };

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
          if (!formData.gender) {
            newErrors.gender = 'Please enter your gender';
          }
          setErrors(newErrors);
      
          if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch('https://gugan-backend.onrender.com/save-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
           
                console.log('Form submitted:', formData);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    gender: ''
                });
              
            navigate('/login');
            console.log('Data posted successfully!');
          } catch (error) {
            alert("Error saving data , please try again");
            console.error('Error posting data:', error);
          }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} id="form">
                        <div className="form-group">
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
                        <div className="form-group mt-4">
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
                        <div className="form-group mt-4">
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
                        <div className="form-group mt-4">
                            <label htmlFor="gender">Gender</label>
                            <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className='error'>{errors.gender}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
