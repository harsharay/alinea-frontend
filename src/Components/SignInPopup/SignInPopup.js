import React from "react"

import { ReactComponent as CloseIcon } from "../../Icons/CloseIcon.svg"
import { ReactComponent as LogoSvg } from "../../Icons/Logo.svg";
import { ReactComponent as GoogleLogoSvg } from "../../Icons/GoogleLogo.svg"


const SignInPopup = ({ changePopup, googleSignIn }) => {
    return (
        <div className="signInPopup">
                <div className="popUp-firstBlock">
                    <p>Keep Track Of Your Stocks</p>
                </div>
                <div className="popUp-secondBlock">
                    <LogoSvg />
                    <button className="signInButtonContentPage" onClick={googleSignIn}><span><GoogleLogoSvg /></span>Continue with Google</button>
                </div>
                <CloseIcon className="closeIcon" onClick={() => changePopup()}/>
        </div>
    )
}

export default SignInPopup;