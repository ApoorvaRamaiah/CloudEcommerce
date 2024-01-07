import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../redux/reducer/authSlice';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { loginUser, logoutUser } from '../redux/action/authActions';
import "../pages/Pages.css";

const Navbar = () => {
  const cartState = useSelector(state => state.handleCart);
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(loginUser());
  };

  const handleLogout = async () => {
    try {
      const logoutResponse = await fetch(`http://localhost:8080/logout`, {
        method: 'GET',
      });

      if (logoutResponse.ok) {
        const data = await logoutResponse.json();
        console.log('User count decremented successfully!', data);
      } else {
        console.error('Error decrementing user count:', logoutResponse.statusText);
      }

      dispatch(logoutUser());

      localStorage.removeItem("userToken");
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('userType');
      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  }
  const userToken = sessionStorage.getItem("userToken");
  const userType = sessionStorage.getItem("userType");
  const userId= sessionStorage.getItem("userId");
  console.log(userType,"NOTE",userId)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/product"> Shop Top! </NavLink>
        <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 textcenter">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
          </ul>
          {userToken ?( userType === "0" ? (
              <>
                <NavLink to="/cart" className="btn btn-outline-dark m-2"> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'}) </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}> Logout </NavLink>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-dark m-2" to="/productlist"> Products</NavLink>
                <NavLink to="/orders" className="btn btn-outline-dark m-2"> Orders </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}> Logout </NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/register" className="btn btn-outline-dark m-2"> <i className="fa fa-user-plus mr-1"></i>  Register </NavLink>
              {/* <NavLink to="/product" className="btn btn-outline-dark m-2">
      <i className="fa fa-sign-in-alt mr-1"></i> Login
    </NavLink> */}
            </>
          )}

          {/* {authState.isAuthenticated ? (
            authState.user.userType === 0 ? (
              <>
                <NavLink to="/cart" className="btn btn-outline-dark m-2"> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'}) </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}> Logout </NavLink>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-dark m-2" to="/productlist"> Products</NavLink>
                <NavLink to="/orders" className="btn btn-outline-dark m-2"> Orders </NavLink>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}> Logout </NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/register" className="btn btn-outline-dark m-2"> <i className="fa fa-user-plus mr-1"></i>  Register </NavLink>
            </>
          )} */}

          {/* <div className="buttons textcenter">
            {authState.isAuthenticated ? (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}><i className="fa fa-cart-shopping mr-1"></i> Logout </NavLink>
                <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'}) </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogin}><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'}) </NavLink>
              </>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
