import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useToasts } from 'react-toast-notifications'

import { SEARCH_DATA } from "../../constants"
import { ReactComponent as CloseIcon } from "../../Icons/CloseIcon.svg"
import { ReactComponent as SeperatorIcon } from "../../Icons/SeperatorIcon.svg"
import { ReactComponent as SearchIcon } from "../../Icons/SearchIcon.svg"
import { ReactComponent as PlusIcon } from "../../Icons/PlusIcon.svg"
import { ReactComponent as LogoSvg } from "../../Icons/Logo.svg";
import { ReactComponent as GoogleLogoSvg } from "../../Icons/GoogleLogo.svg"
import { firestore,googleSignIn } from "../../Firebase/firebaseFunctions"
import firebase from "firebase/app";

import SignInPopup from "../SignInPopup/SignInPopup"


import "./Watchlist.css"

const Wishlist = ({ userData, popUp, changePopup }) => {

    const [fullData, setFullData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchedData, setSearchedData] = useState([])
    const [user, setUser] = useState([])
    const { addToast } = useToasts()
    const [savedStocks, setSavedStocks] = useState([])

    useEffect(() => {
        fetch(SEARCH_DATA)
        .then(data => data.json())
        .then(json => setFullData([...json]))
    },[])

    useEffect(() => {
        setUser(userData)
    }, [userData])

    useEffect(() => {
        if(user) {
            if(Object.keys(user).length>0) {
                handleRetrieve()
            }
        }
    }, [user])

    const handleSearch = e => {
        let value = e.target.value
        setSearchQuery(value)

        if(value.length > 0) {
            const filteredData = fullData.filter(item => item.stock.toLowerCase().includes(value.toLowerCase()))
            setSearchedData(filteredData)
        } else {
            setSearchedData([])
        }
    }

    const handleRetrieve = async () => {
        if(userData){
            let reference = await firestore.collection('stocksData').where("uid","==",userData.uid).get()
            reference.forEach(item => {
                if(item.data().watchlistStocks.length > 0){
                    setSavedStocks(item.data().watchlistStocks)
                }
            })
        }
    }

    const closeClick = () => {
        setSearchedData([])
        setSearchQuery("")
    }

    const handleAddingStockToWatchlist = async (item) => {
        let { openValue, percentChange,valueChange } = item
        if(user){
            //Updating the individual task into the firebase array
            await firestore.doc(`/stocksData/${userData.uid}`).update({ 
                watchlistStocks :  firebase.firestore.FieldValue.arrayUnion({
                    name: item.stock, 
                    openValue,
                    percentChange,
                    valueChange
                })
            })
            addToast("Successfully added the stock to the watchlist", {
                appearance: 'success',
                autoDismiss: true
            })
        }

        // //Retrieving the data
        // let response = await firestore.collection('stocksData').where("uid","==",userData.uid).get()
        // response.forEach(item => setSavedStocks([...savedStocks, item.data().watchlistStocks]))
        setSavedStocks([...savedStocks,{
            name: item.stock,
            openValue: item.openValue,
            percentChange: item.percentChange,
            valueChange: item.valueChange
        }])
    }


    return (
        <div>
            { popUp && <SignInPopup googleSignIn={googleSignIn} changePopup={changePopup}/>}

            <input type="text" value={searchQuery} onChange={handleSearch} className="search"/> 
            {/* {user && <button className="retrieveButton" onClick={handleRetrieve}>Retrieve Data</button>} */}
            <CloseIcon className="closeIconSearchBar" onClick={closeClick}/>
            <SeperatorIcon className="seperatorIcon"/>
            <SearchIcon className="searchIcon"/>
            {/* { searchedData && searchedData.map(item => <p>{item.stock}</p>) } */}
            { searchedData.length>0 && 
                <div className="resultsBlock">
                    {searchedData.map((item, index) => {
                        return (
                            <div className="singleSearchResult" key={index}>
                                <div className="searchResultName">
                                    <p>{item.stock}</p>
                                </div>
                                <div className="searchResultRightSideBlock">
                                    <div className="searchResultPrice">
                                        <p className="stockValue">${item.openValue} <span className="priceText">USD</span></p>
                                        <p className={item.valueChange > 0 ? "stockChange" : "stockChangeRed"}>{item.valueChange>0 ? `+${item.valueChange}` : item.valueChange}<span className="stockChangeSpan"> USD</span><span>({item.percentChange}%)</span></p>
                                    </div>
                                    {user && <PlusIcon className="searchResultAdd" onClick={() => handleAddingStockToWatchlist(item)}/>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <div className="watchlistPageContent">
                <div className="watchListContentBlock">
                    <p className="watchlistTitle">Watchlist</p>
                    <div className="contentHeaders">
                        <p className="companyPTag">COMPANY</p>
                        <p className="marketPricePTag">MARKET PRICE</p>
                    </div>
                    
                    {user ? <div className="actualContent">
                        { savedStocks.length>0 &&
                            savedStocks.map((singleStock, index) => {
                                return (
                                    <div className="contentData" key={index}>
                                        <p className="stockName">{singleStock.name}</p>
                                        <div className="StockPrice">
                                            <p className="stockValue">${singleStock.openValue} <span className="priceText">USD</span></p>
                                            <p className={singleStock.valueChange > 0 ? "stockChange" : "stockChangeRed"}>{singleStock.valueChange>0 ? `+${singleStock.valueChange}` : singleStock.valueChange}<span className="stockChangeSpan">USD</span><span>({singleStock.percentChange}%)</span></p>
                                        </div>
                                    </div>
                                )
                            })    
                        }
                    </div>
                    :
                    <p className="askSignInMessage">Sign in to see watchlisted stocks</p>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData : state.userData
    }
}


export default connect(mapStateToProps)(Wishlist)