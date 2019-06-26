import React from "react";
import styles from './IconNavAction.module.scss';
import {Icon,Button} from "@material-ui/core";
import {Link} from "react-router-dom";

interface IProps {
    icon: string;
    path: string;
    title: string;
}

interface IState {
    
}

export default class IconNavAction extends React.Component<IProps,IState>{

    render() {
        return (
            <Link to={this.props.path} className={styles.nav}>
                <Button href={undefined} className={styles.navButton}>
                    <Icon className={styles.icon}>{this.props.icon}</Icon>
                    {this.props.title}
                </Button>
            </Link>
        );
    }
}