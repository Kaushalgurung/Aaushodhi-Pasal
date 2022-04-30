import React,{useState} from 'react'
import './Cart.css'
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { resetProduct } from '../redux/cartRedux';
import {useDispatch} from 'react-redux'
const stripe_key = "pk_test_51KU68wLRge6iNIRmPd85Zoi2slvHCf1tyXo21D3lq9ndIDrMODXfnUeoZPB47nfa8y8LVdQXFBhW69XUrkUftByy00FH3tv7Cy"

const Cart = () => {
  const dispatch = useDispatch()
  const history = useHistory();
    const [stripeToken, setStripeToken] = useState("")
    const cart = useSelector((state) => state.cart);

    const onToken = (token) => {
      setStripeToken(token);
      dispatch(resetProduct())
      history.push('/')
      
    };
    console.log(cart)
  return (
    <div className = "cartWrapper">
        <h1 className="cartTitle">YOUR BAG</h1>
        <div className="cartTop">
            <button style = {{border : '1px solid black',color : 'black', backgroundColor : 'transparent'}} className = "topButton">CONTINUE SHOPPING</button>
        
        <div className="cartTopTexts">
            <span className="cartTopText">Shopping Bag(2)</span>
            <span className="cartTopText">Your Wishlist (0)</span>
        </div>
        <button className = "topButton" style = {{color : 'white', backgroundColor : 'black'}}>CHECKOUT NOW</button>
        </div>
        <div className="cartBottom">
            <div className="cartInfo">
                {
                    cart.products.map(c => {
                        return <div className="cartProduct">
                        <div className="cartProductDetail">
                        <img className = "cartProductImg" src={c.img} />
                        
                        <div className="cartDetails">
                            <span className = "cartProductName">  <b>Product:</b>{c.medicine_name} </span>
                            <span>
                      <b>ID:</b> {c._id}
                      </span>
                      <div className = "cartProductColor"/>
                      <div className = "cartProductSize">
                        <b>Size:</b> 37.5
                      </div>
                      </div>
                        </div>
                        <div className = "cartPriceDetail">
                    <div className = "cartProductAmountContainer">
                      
                      <div className = "cartProductAmount">Amount : 1</div>
                      
                    </div>
                    <div className = "cartProductPrice">Price : Rs. {c.dosage}</div>
                        </div>
        
                    </div>
        
                    })
                }
              
                

                
                
            </div>
            <div className = "cartSummary">
            <h1 className = "cartSummaryTitle">ORDER SUMMARY</h1>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Subtotal</span>
              <span className = "cartSummaryPrice">$ {cart?.total}</span>
            </div>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Estimated Shipping</span>
              <span className = "cartSummaryPrice">$ 5.90</span>
            </div>
            <div className = "cartSummaryItem">
              <span className = "cartSummaryText">Shipping Discount</span>
              <span className = "cartSummaryPrice">$ -5.90</span>
            </div>
            <div className = "cartSummeryItem" >
              <span  className = "cartSummaryText" style = {{fontWeight : 500, fontSize : "24px"}}>Total</span>
              <span className = "cartSummaryPrice" style = {{fontWeight : 500, fontSize : "24px"}}>$ {cart?.total}</span>
            </div>
            <StripeCheckout
              name="Pharmacy "
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              stripeKey={stripe_key}
              token = {onToken}
            >
              <button className = "cartSummaryButton">CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
        </div>
    </div>
  )
}

export default Cart