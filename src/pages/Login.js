import React, { useCallback, useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import "./Pages.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const userEmail = sessionStorage.getItem("userEmail");
    const userData = sessionStorage.getItem("userData");
    const userType = sessionStorage.getItem("userType");
    const userId = sessionStorage.getItem("userId");

    if (userToken && userEmail) {
      setToken(userToken);
      setUser({ email: userEmail, user:userData, userType:userType, userId:userId });
      
    }
  }, []);

  const loginHandler = useCallback(async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await userCredential.user.getIdTokenResult();
      console.log('User', userToken, userCredential.user);
  
      setToken(userToken.token);
      setUser({ email: userCredential.user.email, user: userCredential.user, userType: userCredential.user.userType, userId: userCredential.user.userId });
  
      sessionStorage.setItem("userToken", userToken.token);
      sessionStorage.setItem("userEmail", userCredential.user.email);
  
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
      const userType = userData.userType;
  
      setUser(prevUser => ({ ...prevUser, userType }));
      sessionStorage.setItem("userType", userType);

      const userId = userData.userId;
      sessionStorage.setItem("userId", userId);
  
      navigate("/product", { state: { userData } });
      console.log("User Data2:", userResponse, userData);
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  }, [auth, email, password, navigate]);
  
  // const logoutHandler = () => {
  //   console.log('Starting logout process...');

  //   signOut(auth)
  //     .then(() => {
  //       setToken(null);
  //       setUser(null);
  //       sessionStorage.removeItem("userToken");
  //       sessionStorage.removeItem("userEmail");
  //       sessionStorage.removeItem("userData");
  //       sessionStorage.removeItem("userType");
  //       sessionStorage.removeItem("userId");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.error('Logout error:', error.message);
  //     });

  //   fetch(`http://localhost:8080/logout`, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('User count decremented successfully!', data);
  //       setModalVisible(true);
  //     })
  //     .catch(error => {
  //       console.error('Error decrementing user count:', error);
  //     });

  //   console.log('Logout process completed.');
  // };
  const logoutHandler = () => {
    console.log('Starting logout process...');
  
    signOut(auth)
      .then(() => {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("userType"); // Remove userType as well
        sessionStorage.removeItem("userId");
        navigate("/login");
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
        setModalVisible(true);
      })
      .catch(error => {
        console.error('Error decrementing user count:', error);
      });
  
    console.log('Logout process completed.');
  };
  
  const handleSubmit = (e) => {
  };
  //   const handleSubmit = (e) => {
//     dispatch(login({
//       email: email,
//       password: password,
//       loggedIn: true,
//     }))
//   }

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      loginHandler(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="textcenter">Login</h1>
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
