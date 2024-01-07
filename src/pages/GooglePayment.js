import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import { selectAuth, login, logout } from '../redux/reducer/authSlice';
import { Button } from "antd";
import { NavLink, useNavigate } from 'react-router-dom';

const GooglePayment = ({ totalAmount, onGooglePayClick, location, productId }) => {
  const navigate = useNavigate();
  // const userId = location?.state && location?.state?.userId;
  const authState = useSelector(selectAuth);
  // const userId = authState.user?.userData?.userId;

  const state = useSelector((state) => state.handleCart);
  const userData = useSelector((state) => state.auth.userData);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cartId, setCartId] = useState(null); 
  const userToken = sessionStorage.getItem("userToken");
  const userType = sessionStorage.getItem("userType");
  const userId = sessionStorage.getItem("userId");
 console.log('loginuser', userId, authState, userData, productId, userToken, userType)
  useEffect(() => {
    calculateTotalAmount();
  }, [totalAmount]);

  const calculateTotalAmount = () => {
    let subtotal = 0;
    state.forEach((item) => {
      subtotal += item.productPrice * item.qty;
    });
    const roundedTotal = Math.round(subtotal);

    setAmount(roundedTotal);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  const handleGooglePayClick = async () => {
    calculateTotalAmount();

    try {
      const cartResponse = await fetch("http://35.246.127.243:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
            quantity: 2,
            user: {
              userId: userId,
            },
            product: {
              productId: productId
            }
        
        }),
      });

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        const receivedCartId = cartData.id;
        setCartId(receivedCartId);
        console.log("id", cartData)
        const orderResponse = await fetch("http://35.246.127.243:8080/order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipped: false,
            amount: amount,
            cartId: receivedCartId, 
          }),
        });

        if (orderResponse.ok) {
          alert("Order placed successfully!")
          navigate("/product");
          console.log("Order placed successfully!");
        } else {
          console.error("Error placing order:", orderResponse.statusText);
        }
      } else {
        console.error("Error creating cart:", cartResponse.statusText);
      }
    } catch (error) {
      console.error("Error handling Google Pay click:", error);
    }
  };

  return (
    <>
      <div className="App">
        <Button onClick={handleGooglePayClick}>Place Order</Button>
        {/* <GooglePayButton
          id="google-pay-button"
          onClick={handleGooglePayClick}
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: amount.toString(),
              currencyCode: "USD",
              countryCode: "US",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
          existingPaymentMethodRequired={false}
          buttonColor="black"
          buttonType="buy"
        /> */}
      </div>
    </>
  );
};

export default GooglePayment;
