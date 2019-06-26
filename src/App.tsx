import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/routes";
import Authenticator from "./components/Shared/Authenticator";

class App extends React.Component {

    render()
    {
        return (
            <>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />

                <div className="App">
                    <BrowserRouter>
                        <Authenticator>
                            <Routes/>
                        </Authenticator>
                    </BrowserRouter>
                </div>
            </>
        );
    }
}

export default App;
