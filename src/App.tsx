import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./components/routes";
import Authenticator from "./components/Shared/Authenticator";
import Actions from "./components/Pages/ActionsSideBar/Actions";
import {ThemeProvider} from '@material-ui/styles';
import createMuiTheme, {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {purple, blueGrey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: blueGrey
    }
} as ThemeOptions);

class App extends React.Component {

    render()
    {
        return (
            <>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />

                <div className="App">
                    <ThemeProvider theme={theme} >
                        <BrowserRouter>
                            <Authenticator>
                                <Actions />
                                <Routes/>
                            </Authenticator>
                        </BrowserRouter>
                    </ThemeProvider>
                </div>
            </>
        );
    }
}

export default App;
