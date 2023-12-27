import React, { useCallback, useState } from "react";
import { Footer, Navbar } from "../components";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useHistory, useNavigate, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import "./Pages.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../redux/reducer/authSlice';
import { loginUser, logoutUser } from '../redux/action/authActions';

const Login = (isAuthenticated) => {
  // const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  // console.log ("auth",auth)
  // console.log ("getauth",getAuth)
  // console.log ("signInWithEmailAndPassword",signInWithEmailAndPassword)
  // const auth = getAuth();

  //   const loginHandler = () => {
  //     const auth = getAuth(); // Get auth object

  //     // Hardcode email and password
  //     const email = "John@gmail.com";
  //     const password = "password";

  //     console.log("email", email)
  //     signInWithEmailAndPassword(auth, email, password)

  //       .then((userCredential) => {
  //         const userToken = userCredential.user.getIdToken();
  //         console.log('User logged in:', userToken);
  //         // Perform any additional actions after successful login

  //         setToken(userToken);
  //         localStorage.setItem("userToken", userToken);
  //         navigate("/product"); // Redirect to home after successful login
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //         console.error('Login error:', error.message);
  //       });
  //  };
  // const loginHandler = async () => {
  //   const auth = getAuth(); // Get auth object

  //   // Hardcode email and password
  //   // const email = "John@gmail.com";
  //   // const password = "password";

  //   console.log("email", email)

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const userToken = userCredential.user.getIdTokenResult();
  //     console.log('User logged in:', userCredential, userToken);
  //     // Perform any additional actions after successful login

  //     setToken(userToken);
  //     localStorage.setItem("userToken", userToken);
  //     navigate("/product"); // Redirect to home after successful login
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Login error:', error.message);
  //   }
  // };
// console.log("before",authState); 

  // const loginHandler = async (e) => {
  //   const auth = getAuth(); // Get auth object
  //   e.preventDefault();
  
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const userToken = await userCredential.user.getIdTokenResult(); // Await here
  //     console.log('User logged in:', userCredential, userToken);
  
  //     // Perform any additional actions after successful login
  
  //     setToken(userToken.token); // Assuming getIdTokenResult returns an object with a 'token' property
  //     localStorage.setItem("userToken", userToken.token);
  //     navigate("/product"); // Redirect to home after successful login
  //     // dispatch(login({
  //     //   email:email,
  //     //   password:password,
        
  //     // }))
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Login error:', error.message);
  //   }
  // };
// console.log("After",authState); 
const loginHandler = useCallback(async (e) => {
  const auth = getAuth(); // Get auth object
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userToken = await userCredential.user.getIdTokenResult();

    setToken(userToken.token);
    localStorage.setItem("userToken", userToken.token);
    navigate("/product");
    // navigate.replace('/login');
    dispatch(login()); // Dispatch the login action
  } catch (error) {
    setError(error.message);
    console.error('Login error:', error.message);
  }
}, [auth, email, password, navigate, dispatch]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setToken(null);
        localStorage.removeItem("userToken");
        navigate("/login"); // Redirect to home after logout
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };
  const handleSubmit = (e)=>{
    dispatch(login({
      email : email ,
      password : password,
      loggedIn:true
    }))
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        {/* <h1 className="textcenter">{token ? "Logout" : "Login"}</h1> */}
        <h1 className="textcenter">{isAuthenticated ? "Login" : "Logout"}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={(e)=> handleSubmit(e)}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
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
              {/* <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{' '}
                </p>
              </div> */}
              <div className="my-3">
                <p>
                  {token ? (
                    <button
                      className="my-2 mx-auto btn btn-dark"
                      type="button"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      New Here?{' '}
                      <Link to="/register" className="text-decoration-underline text-info">
                        Register
                      </Link>{' '}
                    </>
                  )}
                </p>
              </div>
              <div className="textcenter">
                {!token && (
                  <button
                    className="my-2 mx-auto btn btn-dark"
                    type="button"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                )}
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
