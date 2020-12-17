import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { ReactComponent as LogoSvg } from "../../Icons/Logo.svg"
import { ReactComponent as GoogleLogoSvg } from "../../Icons/GoogleLogo.svg"
import { auth, googleSignIn, createUserDocument } from '../../Firebase/firebaseFunctions'
import { NavLink } from "react-router-dom"

import "./NavBar.css"


const NavBar = ({ changePopup, signingIn}) => {

    const [userData, setUserData] = useState([])
    const [displayPic, setDisplayPic] = useState("")
    


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUserData(user)
            signingIn(user)
            createUserDocument(user)
            if(user) {
                setDisplayPic(user.providerData[0].photoURL)
            }
        })
    },[])

    const handleSignInClick = () => {
        // googleSignIn()
        // changePopup(true)
        changePopup()
    }

    const handleSignOut = () => {
        auth.signOut()
        setDisplayPic("")
        setUserData([])
    }

    return (
        <div className="navBar">
            <LogoSvg />
            <div className="menuItems">
                <NavLink to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/watchList" activeClassName="active">WatchList</NavLink>
            </div>
            <div className="signIn">
                { userData ? <img src={displayPic} alt={auth.displayName} className="profilePicture" onClick={handleSignOut} title="Sign Out"/> : <button className="signInButton" onClick={handleSignInClick}><span><GoogleLogoSvg /></span>Continue with Google</button> }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    if(state.userData) {
        console.log(56, state.userData)
    } 
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        signingIn : (auth) => dispatch({ type:"SIGNIN", payload:auth })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);