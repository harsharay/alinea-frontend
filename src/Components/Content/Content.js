import React, { useState, useEffect } from "react"
import { SHOW_DATA } from "../../constants"
import { googleSignIn } from '../../Firebase/firebaseFunctions'
import SignInPopup from "../SignInPopup/SignInPopup"

import "./Content.css"

    const Content = (props) => {
        
        const [stocksData, setStocksData] = useState([])

        useEffect(() => {
            fetch(SHOW_DATA)
            .then(data => data.json())
            .then(json => setStocksData([...json]))
        },[])

        return (
            <div>
                { props.popUp && <SignInPopup googleSignIn={googleSignIn} changePopup={props.changePopup}/>}

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