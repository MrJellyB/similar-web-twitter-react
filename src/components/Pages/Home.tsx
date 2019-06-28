import React from "react";
import {GlobalFeed} from "./Feed/GlobalFeed";

export default class Home extends React.Component{
    render() {
        return (
            <>
                <div>Home</div>
                <GlobalFeed />
            </>
        );
    }
}