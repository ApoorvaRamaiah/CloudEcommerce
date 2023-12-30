import React from "react";
// import logo from "../../public/shopping.png"
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GooglePayButton  from "@google-pay/button-react";


const GooglePayment = () => {
    const state = useSelector((state) => state.handleCart);
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
        return (subtotal += item.price * item.qty);
    });
    state.map((item) => {
        return (totalItems += item.qty);
    })
    // Configure the button by passing the payment request data as props
    return (
        <>
            <div className="App">
                <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                            {
                                type: 'CARD',
                                parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                },
                                tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                        gateway: 'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                    },
                                },
                            },
                        ],
                        merchantInfo: {
                            merchantId: '12345678901234567890',
                            merchantName: 'Demo Merchant',
                        },
                        transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice: '100.00',
                            currencyCode: 'USD',
                            countryCode: 'US',
                        },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                        console.log('load payment data', paymentRequest);
                    }}
                    existingPaymentMethodRequired={false} // Corrected prop name and use boolean value
                    buttonColor="black"
                    buttonType="buy"
                />

            </div>
        </>

    )
};


export default GooglePayment;