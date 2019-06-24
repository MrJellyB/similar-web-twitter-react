import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/routes";
import ActionsSideBar from "./components/Pages/ActionsSideBar";
import Authenticator from "./components/Shared/Authenticator";

class App extends React.Component {

    render()
    {
        return (
            <div className="App">
                <BrowserRouter>
                    {/*<Register>*/}
                    <Authenticator>
                        <Routes/>
                        <ActionsSideBar/>
                    </Authenticator>
                    {/*</Register>*/}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
