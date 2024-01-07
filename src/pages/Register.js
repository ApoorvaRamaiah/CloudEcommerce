import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState(0); 

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;
            console.log('User registered:', user);
            const registrationResponse = await fetch('http://35.246.127.243:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    mobile,
                    address,
                    pincode,
                    password,
                    // usertype,
                }),
            });

            alert("User Registered Successfully")

            navigate("/login"); 

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
            alert(errorMessage)
        }
    };
    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
          handleRegister(e);
        }
      };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="textcenter">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleRegister}>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Mobile">Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Mobile"
                                    placeholder="Enter Your Mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Address"
                                    placeholder="Enter Your Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Pincode">Pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Pincode"
                                    placeholder="Enter Your Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="textcenter">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" onKeyDown={handleKeyEnter}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;

