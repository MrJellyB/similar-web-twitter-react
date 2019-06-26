import React from "react";
import {Box} from "@material-ui/core";
import styles from "./IconsSideBar.module.scss";

interface IState {
}

interface IProps {

}

export default class IconsSideBar extends React.Component<IProps,IState> {
    render() {
        return (
            <div className={styles.navBar}>
                <Box color={"primary"} >
                    {this.props.children}
                </Box>
            </div>
            );
    }
}