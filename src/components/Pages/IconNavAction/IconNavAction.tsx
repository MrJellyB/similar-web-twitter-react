import React from "react";
import styles from './IconNavAction.module.scss';
import {Icon,Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Manager, Reference, Popper} from "react-popper";

interface IProps {
    icon: string;
    path?: string;
    title: string;
}

interface IState {
    
}

export default class IconNavAction extends React.Component<IProps,IState>{

    render() {
        if(this.props.path != null) {

            return (
                <Link to={this.props.path} className={styles.nav}>
                    <Button href={undefined} className={styles.navButton}>
                        <Icon className={styles.icon}>{this.props.icon}</Icon>
                        {this.props.title}
                    </Button>
                </Link>
            );
        }
        else {
            return (
                <Manager>
                    <Reference>
                        {({ref}) => (
                            <Button href={undefined} className={styles.navButton} ref={ref}>
                                <Icon className={styles.icon}>{this.props.icon}</Icon>
                                {this.props.title}
                            </Button>
                        )}
                    </Reference>

                    <Popper placement="right">
                        {({ ref, style, placement, arrowProps }) => (
                            <div ref={ref} style={style} data-placement={placement}>
                                Popper element
                                <div ref={arrowProps.ref} style={arrowProps.style} />
                            </div>
                        )}
                    </Popper>
                </Manager>
            )
        }
    }
}