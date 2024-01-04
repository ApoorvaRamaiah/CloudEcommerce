import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useHistory, useNavigate } from 'react-router-dom';
import GooglePayment from "./GooglePayment";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showGooglePayment, setShowGooglePayment] = useState(false);
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/product" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };
  // const handleGooglePaymentClick = () => {
  //   // Add your logic here to handle the Google Payment click
  // };
  const handleGooglePaymentClick = (cartData) => {
    // Add your logic here to send data to the backend
    console.log("Sending data to the backend:", cartData);
    alert("Google Payment button clicked!");

    // Example: You can use fetch to send data to your backend endpoint
    // fetch("/your-backend-endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(cartData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Backend response:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending data to the backend:", error);
    //   });
  };
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 5.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item?.productPrice * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item?.productImage}
                                  // className="w-100"
                                  alt={item?.productImage}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item?.productName}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.qty}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ${item?.productPrice}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>
                    <div className="text-center">
                      {/* {state.length > 0 && (
                        <>
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            onClick={() => setShowGooglePayment(true)}
                          >
                            Google Payment
                          </button>
                          {showGooglePayment && (
                            <GooglePayment
                              onClose={() => setShowGooglePayment(false)}
                            />
                          )}
                        </>
                      )} */}
                      {/* {state.length > 0 && (
                      <>
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          onClick={() => setShowGooglePayment(true)}
                          disabled={showGooglePayment}
                        >
                          {showGooglePayment
                            ? "Processing..."
                            : "Buy with Google"}
                        </button>
                        {showGooglePayment && (
                          <GooglePayment onClose={() => setShowGooglePayment(false)} />
                        )}
                      </>
                    )} */}
                          <GooglePayment onClick={handleGooglePaymentClick}> click</GooglePayment>

                    </div>
                    {/* <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link> */}
                    {/* <Link
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/googlepayment"

                    >
                      Google Payment
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state?.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
