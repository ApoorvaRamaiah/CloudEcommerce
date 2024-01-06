// import React from 'react'
// import { Footer, Navbar } from "../components";
// import { Link } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// const Register = () => {
//     return (
//             <Navbar />
//             <div className="container my-3 py-3">
//                 <h1 className="textcenter">Register</h1>
//                 <hr />
//                 <div class="row my-4 h-100">
//                     <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                         <form>
//                             <div class="form my-3">
//                                 <label for="Name">Full Name</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Name"
//                                     placeholder="Enter Your Name"
//                                 />
//                             </div>
//                             <div class="form my-3">
//                                 <label for="Email">Email address</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Email"
//                                     placeholder="name@example.com"
//                                 />
//                             </div>
//                             <div class="form  my-3">
//                                 <label for="Password">Password</label>
//                                 <input
//                                     type="password"
//                                     class="form-control"
//                                     id="Password"
//                                     placeholder="Password"
//                                 />
//                             </div>
//                             <div className="my-3">
//                                 <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
//                             </div>
//                             <div className="textcenter">
//                                 <button class="my-2 mx-auto btn btn-dark" type="submit">
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Register


// import React, { useState } from 'react';
// import { Footer, Navbar } from "../components";
// import { Link } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegister = (e) => {
//         e.preventDefault();
//         const auth = getAuth();
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // User registered successfully
//                 const user = userCredential.user;
//                 console.log('User registered:', user);
//             })
//             .catch((error) => {
//                 // Error occurred during registration
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.error('Registration error:', errorCode, errorMessage);
//             });
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="container my-3 py-3">
//                 <h1 className="textcenter">Register</h1>
//                 <hr />
//                 <div class="row my-4 h-100">
//                     <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                         <form onSubmit={handleRegister}>
//                             <div class="form my-3">
//                                 <label for="Name">Full Name</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Name"
//                                     placeholder="Enter Your Name"
//                                 />
//                             </div>
//                             <div class="form my-3">
//                                 <label for="Email">Email address</label>
//                                 <input
//                                     type="email"
//                                     class="form-control"
//                                     id="Email"
//                                     placeholder="name@example.com"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div class="form  my-3">
//                                 <label for="Password">Password</label>
//                                 <input
//                                     type="password"
//                                     class="form-control"
//                                     id="Password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                             <div className="my-3">
//                                 <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
//                             </div>
//                             <div className="textcenter">
//                                 <button class="my-2 mx-auto btn btn-dark" type="submit">
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }
// export default Register

// import React, { useState } from 'react';
// import { Footer, Navbar } from "../components";
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         const auth = getAuth();

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             // User registered successfully
//             const user = userCredential.user;
//             console.log('User registered:', user);
//             navigate("/login"); // Redirect to home after successful login

//         } catch (error) {
//             // Error occurred during registration
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error('Registration error:', errorCode, errorMessage);
//         }
//     };
 
//     return (
//         <>
//             <Navbar />
//             <div className="container my-3 py-3">
//                 <h1 className="textcenter">Register</h1>
//                 <hr />
//                 <div className="row my-4 h-100">
//                     <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                         <form onSubmit={handleRegister}>
//                             {/* <div className="form my-3">
//                                 <label htmlFor="Name">Full Name</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="Name"
//                                     placeholder="Enter Your Name"
//                                 />
//                             </div> */}
//                             <div className="form my-3">
//                                 <label htmlFor="Email">Email address</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="Email"
//                                     placeholder="name@example.com"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form  my-3">
//                                 <label htmlFor="Password">Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id="Password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                             <div className="my-3">
//                                 <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
//                             </div>
//                             <div className="textcenter">
//                                 <button className="my-2 mx-auto btn btn-dark" type="submit">
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Register;

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
    const [usertype, setUsertype] = useState(0); // Default usertype

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // User registered successfully
            const user = userCredential.user;
            console.log('User registered:', user);

            // Trigger the registration POST API here
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

            // const registrationData = await registrationResponse.json();
            // Do something with registrationData if needed
            // console.log('Registration Data:', registrationData);
            alert("User Registered Successfully")

            navigate("/login"); // Redirect to login page after successful registration

        } catch (error) {
            // Error occurred during registration
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
            alert(errorMessage)
        }
    };
    const handleKeyEnter = (e) => {
        if (e.key === "Enter") {
          // Trigger login action when the "Enter" key is pressed
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

