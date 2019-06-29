import React from "react";
import {UserFeed} from "./Feed/UserFeed";

export default class Home extends React.Component{
    render() {
        return (
            <>
                <div>Home</div>
                <UserFeed />
            </>
        );
    }
}