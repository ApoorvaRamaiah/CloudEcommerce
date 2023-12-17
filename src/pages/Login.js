import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

// console.log ("auth",auth)
// console.log ("getauth",getAuth)
// const auth = getAuth();

  // const loginHandler = async () => {
  //   try {
  //     const response = await auth.signInWithEmailAndPassword(email, password);
  //   console.log('in', userName, password, response)
  //     const userToken = response.user?.getIdToken();
  //     setToken(userToken);
  //     localStorage.setItem("userToken", userToken);
  //     console.log("user", userToken)
  //     console.log(response)
  //     navigate("/product"); // Redirect to home after successful login
  //   } catch (error) {
  //     setError(error.message);
  //     console.log(error)

  //   }
  // };
  const loginHandler = () => {
    const auth = getAuth(); // Get auth object
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userToken = userCredential.user.getIdToken();
        console.log('User logged in:', userToken);
        // Perform any additional actions after successful login
  
        setToken(userToken);
        localStorage.setItem("userToken", userToken);
        navigate("/product"); // Redirect to home after successful login
      })
      .catch((error) => {
        setError(error.message);
        console.error('Login error:', error.message);
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
               <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  value={userName}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn btn-dark"
                  type="button"
                  onClick={loginHandler}
                >
                  Login
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

export default Login;
