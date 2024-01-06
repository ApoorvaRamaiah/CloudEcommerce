import React, { useCallback, useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useHistory, useNavigate, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import "./Pages.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../redux/reducer/authSlice';
import { selectUser, ulogin, ulogout } from '../redux/reducer/userSlice';
import { loginUser, logoutUser } from '../redux/action/authActions';

const Login = (isAuthenticated) => {
  // const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const userState = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const userToken = localStorage.getItem("userToken");
        setToken(userToken);
        dispatch(login({ email: user.email, loggedIn: true }));
      } else {
        // User is signed out.
        setToken(null);
        dispatch(logout());
      }
    });
  
    return () => {
      // Unsubscribe the listener when the component unmounts
      unsubscribe();
    };
  }, [auth, dispatch]);
  

  //  console.log("user",userState)
  // const loginHandler = useCallback(async (e) => {
  //   const auth = getAuth(); // Get auth object
  //   e.preventDefault();

  //   try {
  //     // const loginResponse = await fetch(`http://localhost:8080/login`);
  //     //   const loginData = await loginResponse.json();
  //     //   if (!loginData) {
  //     //     throw new Error("Empty or invalid response from the server");
  //     //   }
  //     //   // Do something with loginData if needed
  //     //   console.log("Login Data:", loginResponse, loginData);
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const userToken = await userCredential.user.getIdTokenResult();

  //     setToken(userToken.token);
  //     localStorage.setItem("userToken", userToken.token);
  //     navigate("/product");
  //     // navigate.replace('/login');
  //     // dispatch(login()); // Dispatch the login action
  //     // dispatch(loginUser(user.email, user.displayName, user.uid, user.role));
  //     //   // Redirect based on user role
  //     //   if (user.role === 1) {
  //     //     history.push("/admin"); // Redirect to admin page for role 1
  //     //   } else {
  //     //     history.push("/product"); // Redirect to product page for role 2
  //     //   }
  //     const userResponse = await fetch(`http://localhost:8080/user?email=${email}`);
  //     const userData = await userResponse.json();

  //     console.log("User Data:", userResponse, userData);

  //     dispatch(login({
  //       email: email,
  //       userType: userData.userType, // Assuming the user type is available in userData
  //       loggedIn: true,
  //     }));
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Login error:', error.message);
  //   }
  // }, [auth, email, password, navigate, dispatch]);
  const loginHandler = useCallback(async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await userCredential.user.getIdTokenResult();
  
      setToken(userToken.token);
      localStorage.setItem("userToken", userToken.token);
  
      // Make API request to increment user count
      const loginResponse = await fetch(`http://localhost:8080/login`, {
        method: 'GET',
      });
  
      if (loginResponse.ok) {
        console.log('User count incremented successfully!');
      } else {
        console.error('Error incrementing user count:', loginResponse.statusText);
      }
  
  
      const userResponse = await fetch(`http://localhost:8080/user?email=${email}`);
      const userData = await userResponse.json();
  
      console.log("User Data:", userResponse, userData);
  
      dispatch(login({
        email: email,
        userType: userData.userType,
        userData: userData,
        loggedIn: true,
      }));
      const userId = userData.userId;
      navigate("/product", { state: { userData } });
      console.log("User Data2:", userResponse, userData);

    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  }, [auth, email, password, navigate, dispatch]);
  
  
  const logoutHandler = () => {
    console.log('Starting logout process...');
  
    // Rest of your code...
    signOut(auth)
    .then(() => {
      setToken(null);
      localStorage.removeItem("userToken");
      navigate("/login"); // Redirect to home after logout
    })
    .catch((error) => {
      console.error('Logout error:', error.message);
    });
    fetch(`http://localhost:8080/logout`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      console.log('User count decremented successfully!', data);
  
      // Update Redux store with logout action
      dispatch(logoutUser());
  
      // Show modal or perform any other action
      // You can use a state variable to manage the modal visibility
      setModalVisible(true);
    })
    .catch(error => {
      console.error('Error decrementing user count:', error);
    });
  
    console.log('Logout process completed.');
  };
  
  const handleSubmit = (e) => {
    dispatch(login({
      email: email,
      password: password,
      loggedIn: true,
    }))
  }
  // const registerUser = async (email, password) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     return userCredential.user;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      // Trigger login action when the "Enter" key is pressed
      loginHandler(e);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        {/* <h1 className="textcenter">{token ? "Logout" : "Login"}</h1> */}
        <h1 className="textcenter">{isAuthenticated ? "Login" : "Logout"}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyEnter}
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
                  onKeyDown={handleKeyEnter}
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
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
