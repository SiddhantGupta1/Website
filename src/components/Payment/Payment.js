import React,{useState} from 'react'
import './Payment.css'
import Logo from '../../icons/Deeva Black Logo.svg'
import {Radio, RadioGroup, FormControlLabel, StylesProvider} from '@material-ui/core';
import Demo from '../../icons/Trend Image.svg'
import Gpay from '../../icons/Google Pay.svg'
import Paytm from '../../icons/Paytm Logo.svg'
import Phonepe from '../../icons/Phone Pe.svg'

const Payment = () => {

    const bills = [
        {
            id: 1,
            name: "Neeva",
            fullName: "Neeva Yellow Taant Fashion ",
            image: Demo,
        },
        {
            id: 2,
            name: "Neeva",
            fullName: "Neeva Yellow Taant Fashion ",
            image: Demo,
        },
    ]

    const [bill, setBill] = useState(bills)
    const [radio, setRadio] = useState("gpay") 
    const [quantity, setQuantity] = useState(1)

    const add = () => {
        var increment = quantity + 1
        setQuantity(increment)
    }
    const subtract = (id) => {
        var decrement = quantity - 1
        if(decrement === 0) {
            const newList = bill.filter((e) => e.id!==id )
            setBill(newList)
        }
        else {
            setQuantity(decrement)
        }
    }

    return (
        <div className="PaymentPage">

            <div className="PaymentPage-path">Home&ensp; &gt; &ensp; Select Address&ensp; &gt; &ensp; Payment</div>
            <div style={{width:"100%", display:"flex", flexDirection: "column", alignItems: "center", marginLeft:"35px"}}>
                <img src={Logo} alt="Deeva Logo" style={{width:"142px", height:"57px", mixBlendMode:"darken"}} />
                <div className="PaymentPage-heading" >Check the details and Choose a Payment method</div>

                <div>
                    <div style={{width:"100%"}}>
                        <div className="Payment-card">
                            <div className="PaymentPage-instructions">Choose how you want to pay, If it is a card, choose it and enter the cvv, If it is any online payment mode,<br/>Enter your mobile number and go to the online payment appliction and check your pending payments.</div>
                            <div className="saved-cards">Saved Cards</div>

                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <RadioGroup value={radio} onChange={() => setRadio("card1")} style={{float:"left"}} >
                                        <StylesProvider injectFirst><FormControlLabel value="card1" control={<Radio />} /></StylesProvider>
                                    </RadioGroup>
                                    <div className="saved-cards-card">

                                    </div>
                                </div>

                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <RadioGroup value={radio} onChange={() => setRadio("card2")} style={{float:"left"}} >
                                        <StylesProvider injectFirst><FormControlLabel value="card2" control={<Radio />} /></StylesProvider>
                                    </RadioGroup>
                                    <div className="saved-cards-card">

                                    </div>
                                </div>
                                
                                <button className="add-card-btn">Add Card &nbsp;<span>+</span></button>
                            </div>

                            <div className="other-payment-modes">Other Payment Modes</div>
                            <div className="other-payment-modes-container">
                                <div className="gpay">
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <RadioGroup value={radio} onChange={() => setRadio("gpay")} style={{float:"left"}} >
                                            <StylesProvider injectFirst><FormControlLabel value="gpay" control={<Radio />} /></StylesProvider>
                                        </RadioGroup>
                                        <div>Google Pay</div>
                                        <img src={Gpay} alt=""/>
                                    </div>
                                    {radio==="gpay" ? <input id="gpay-input" type="text" placeholder="Enter your Mobile number" maxLength="10" ></input> : <div></div>}
                                </div>
                                <div className="paytm">
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <RadioGroup value={radio} onChange={() => setRadio("paytm")} style={{float:"left"}} >
                                            <StylesProvider injectFirst><FormControlLabel value="paytm" control={<Radio />} /></StylesProvider>
                                        </RadioGroup>
                                        <div>Paytm</div>
                                        <img src={Paytm} alt=""/>
                                    </div>
                                    {radio==="paytm" ? <input id="paytm-input" type="text" placeholder="Enter your Mobile number" maxLength="10" ></input> : <div></div>}
                                </div>
                                <div className="phonepe">
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <RadioGroup value={radio} onChange={() => setRadio("phonepe")} style={{float:"left"}} >
                                            <StylesProvider injectFirst><FormControlLabel value="phonepe" control={<Radio />} /></StylesProvider>
                                        </RadioGroup>
                                        <div>Phonepe</div>
                                        <img src={Phonepe} alt=""/>
                                    </div>
                                    {radio==="phonepe" ? <input id="phonepe-input" type="text" placeholder="Enter your Mobile number" maxLength="10" ></input> : <div></div>}
                                </div>
                            </div>

                            <div className="pay-on-delivery">
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <RadioGroup value={radio} onChange={() => setRadio("cash")} style={{float:"left"}} >
                                        <StylesProvider injectFirst><FormControlLabel value="cash" control={<Radio />} /></StylesProvider>
                                    </RadioGroup>
                                    <dt className="pay-on-delivery-text">Pay On Delivery</dt>
                                </div>
                                <article>Pay with cash at your place at the time of delivery.</article>
                            </div>

                        </div>

                        <div className="OrderDetails-card">
                            <dt>Order Details</dt>
                            <div style={{marginBottom:"29px"}}>
                                {bill.map((e,i) => (
                                    <div key={i} className="OrderDetails-content">
                                        <div className="OrderDetails-img">
                                            <img src={e.image} alt="" style={{width:"30px", height:"30px"}}/>
                                        </div>
                                        <div style={{width:"100%", display:"flex", flexDirection:"column"}}>
                                            <article>{e.name}</article>
                                            <dt>{e.fullName}</dt>
                                        </div>
                                        <div className="OrderDetails-qty-btn">
                                            <button onClick={() => { subtract(e.id) }}>-</button>
                                            <dt>{quantity}</dt>
                                            <button onClick={() => { add() }}>+</button>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>

                            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"9px"}}>
                                <div className="OrderDetails-qty">Quantity</div>
                                <div id="OrderDetails-qty">{bill.length}</div>
                            </div>

                            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"9px"}}>
                                <div className="OrderDetails-subtotal">Subtotal</div>
                                <div id="OrderDetails-subtotal">&#8377;999</div>
                            </div>

                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="OrderDetails-delivery">Delivery Charges</div>
                                <div id="OrderDetails-delivery">Free</div>
                            </div>

                            <div className="OrderDetails-divider"></div>
                            
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="OrderDetails-total">Total Payment</div>
                                <div id="OrderDetails-total">&#8377;999</div>
                            </div>

                            <button className="OrderDetails-btn">Pay and Place the Order</button>
                        </div>

                    </div>
                </div>
                <div className="PaymentPage-footer">Conditions of Use | Privacy Notice © 2021-2029, Deeva.in, Inc. and its affiliates</div>
            </div>


        </div>
    )
}

export default Payment;