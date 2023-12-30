import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import { Product, Products, AboutPage, Cart, Login, Register, Checkout, PageNotFound, ProductList, GooglePayment } from "./pages";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Navigate to ='/login'/>} /> */}
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/productlist" element={<ProductList />} />
        {/* <Route path="/payment" element={<Navigate to ='/payment'/>} /> */}
        <Route path="/googlepayment" element={<GooglePayment/>} />
      </Routes>
    </Provider>
  </BrowserRouter>
);