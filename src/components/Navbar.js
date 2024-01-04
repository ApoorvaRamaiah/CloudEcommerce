import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../redux/reducer/authSlice';
import { loginUser, logoutUser } from '../redux/action/authActions';
import "../pages/Pages.css";

const Navbar = () => {
  const cartState = useSelector(state => state.handleCart);
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  // console.log(authState);

  const handleLogin = () => {
    // Call the loginUser action to tell the box to log in
    dispatch(loginUser());
  };
  const handleLogout = () => {
    dispatch(logoutUser()); // Assuming you have a logout action in your authSlice

    // Add any additional logout logic here, such as clearing local storage, navigating, etc.
    // For example:
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/product"> Shop Top! </NavLink>
        <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 textcenter">
            {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
          </ul>
          {/* {authState.isAuthenticated && authState.user.userType === 1 ? (
            <>
              <NavLink className="btn btn-outline-dark m-2" to="/productlist">Products</NavLink>
              <NavLink className="btn btn-outline-dark m-2" to="/orders">Orders</NavLink>
              <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}> Logout </NavLink>
              <NavLink to="/cart" className="btn btn-outline-dark m-2"> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'})</NavLink>
            </>
          )} */}
          {authState.isAuthenticated ? (
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
              {/* <NavLink to="/product" className="btn btn-outline-dark m-2">
      <i className="fa fa-sign-in-alt mr-1"></i> Login
    </NavLink> */}
            </>
          )}

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

// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectAuth, loginUser, logoutUser } from '../redux/reducer/authSlice';
// import "../pages/Pages.css";

// const Navbar = () => {
//   const cartState = useSelector(state => state.handleCart);
//   const authState = useSelector(selectAuth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const handleLogin = () => {
//   //   dispatch(loginUser());
//   // };

//   // const handleLogout = () => {
//   //   dispatch(logoutUser());
//   //   localStorage.removeItem("userToken");
//   //   navigate("/login");
//   // };
//   const handleLogin = () => {
//     // Call the loginUser action to tell the box to log in
//     dispatch(loginUser());
//   };
//   const handleLogout = () => {
//     dispatch(logoutUser()); // Assuming you have a logout action in your authSlice

//     // Add any additional logout logic here, such as clearing local storage, navigating, etc.
//     // For example:
//     localStorage.removeItem("userToken");
//     navigate("/login");
//   }
//   console.log(authState);
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
//       <div className="container">
//         <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Shop Top! </NavLink>
//         <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav m-auto my-2 textcenter">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/about">About</NavLink>
//             </li>
//             {/* {authState.isAuthenticated && authState.userType === 1 && (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/product">Products</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/orders">Orders</NavLink>
//                 </li>
//               </>
//             )} */}
//           </ul>

//           <div className="buttons textcenter">
//             {authState.isAuthenticated ? (
//               <>
//                 <NavLink to="/cart" className="btn btn-outline-dark m-2">
//                   <i className="fa fa-cart-shopping mr-1"></i> Cart ({cartState?.length > 0 ? `${cartState?.length}` : '0'})
//                 </NavLink>
//                 <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogout}>
//                   <i className="fa fa-cart-shopping mr-1"></i> Logout
//                 </NavLink>
//               </>
//             ) : (
//               <>
//                 <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={handleLogin}>
//                   <i className="fa fa-sign-in-alt mr-1"></i> Login
//                 </NavLink>
//                 <NavLink to="/register" className="btn btn-outline-dark m-2">
//                   <i className="fa fa-user-plus mr-1"></i> Register
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
