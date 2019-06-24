import React from 'react';
import Register from './components/Pages/Register';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/routes";
import ActionsSideBar from "./components/Pages/ActionsSideBar";

class App extends React.Component {

    render()
    {
        return (
            <div className="App">
                <BrowserRouter>
                    {/*<Register>*/}
                        <Routes/>
                        <ActionsSideBar />
                    {/*</Register>*/}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
