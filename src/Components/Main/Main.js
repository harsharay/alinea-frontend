import React,{ useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"

import NavBar from "../NavBar/NavBar"
import Content from "../Content/Content"
import WatchList from "../WatchList/Watchlist"
import "./Main.css"

const Main = () => {

    const [popUp, setPopUp] = useState(false)

    const changePopup = () => {
        setPopUp(!popUp)
    }



    return (
        <BrowserRouter>
            <NavBar changePopup={changePopup}/>
            <Switch>
                {/* <Route exact path="/" component={Content} popUp={popUp} changePopup={changePopup}/> */}
                <Route exact path="/" render={props => <Content popUp={popUp} changePopup={changePopup} title={"necessary props"}/> }/>
                <ToastProvider><Route exact path="/watchList" render={props => <WatchList popUp={popUp} changePopup={changePopup} title={"necessary props"}/> }/></ToastProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Main;