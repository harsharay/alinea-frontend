import React, { useState, useEffect } from "react"
import { SHOW_DATA } from "../../constants"
import { ReactComponent as LogoSvg } from "../../Icons/Logo.svg";
import { ReactComponent as GoogleLogoSvg } from "../../Icons/GoogleLogo.svg"
import { ReactComponent as CloseIcon } from "../../Icons/CloseIcon.svg"
import { auth, googleSignIn, user } from '../../Firebase/firebaseFunctions'


import "./Content.css"

// const Content = ({ popUp ,changePopup}) => {
    const Content = (props) => {

    const [stocksData, setStocksData] = useState([])

    useEffect(() => {
        fetch(SHOW_DATA)
        .then(data => data.json())
        .then(json => setStocksData([...json]))
    },[])

    // useEffect(() => {
    //     console.log(props, 22)
    // },[])


    return (
        <div>
            { props.popUp &&
            <div className="signInPopup">
                <div className="popUp-firstBlock">
                    <p>Keep Track Of Your Stocks</p>
                </div>
                <div className="popUp-secondBlock">
                    <LogoSvg />
                    <button className="signInButtonContentPage" onClick={googleSignIn}><span><GoogleLogoSvg /></span>Continue with Google</button>
                </div>
                <CloseIcon className="closeIcon" onClick={() => props.changePopup()}/>
            </div>
            }
            <div className="contentBlock">
                <p className="popularStocksTag">Popular Stocks</p>
                <div className="contentHeaders">
                    <p className="companyPTag">COMPANY</p>
                    <p className="marketPricePTag">MARKET PRICE</p>
                </div>
                
                <div className="actualContent">
                    { stocksData &&
                        stocksData.map((singleStock, index) => {
                            return (
                            <div className="contentData" key={index}>
                                <p className="stockName">{singleStock.stock}</p>
                                <div className="StockPrice">
                                    <p className="stockValue">${singleStock.openValue} <span className="priceText">USD</span></p>
                                    <p className={singleStock.valueChange > 0 ? "stockChange" : "stockChangeRed"}>{singleStock.valueChange>0 ? `+${singleStock.valueChange}` : singleStock.valueChange}<span className="stockChangeSpan">USD</span><span>({singleStock.percentChange}%)</span></p>
                                </div>
                            </div>
                            )
                        })    
                    }
                </div>
            </div>
        </div>
    )
}

export default Content;