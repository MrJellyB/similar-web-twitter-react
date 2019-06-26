import React from "react";
import ReactDOM from "react-dom";
import styles from './IconNavAction.module.scss';
import {Icon, Button, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Manager, Reference, Popper} from "react-popper";

interface IProps {
    icon: string;
    path?: string;
    title: string;
}

interface IState {
    elementForPopper: any;
    isOpen:boolean;
}

export default class IconNavAction extends React.Component<IProps,IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            elementForPopper: document.getElementById('root'),
            isOpen: false
        };
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

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
                            <Button href={undefined} className={styles.navButton} ref={ref} onClick={this.handleClick}>
                                <Icon className={styles.icon}>{this.props.icon}</Icon>
                                {this.props.title}
                            </Button>
                        )}
                    </Reference>
                    {this.state.isOpen && ReactDOM.createPortal((
                        <Popper placement="right" positionFixed={true}>
                            {({ref, style, placement, arrowProps}) => (
                                <div ref={ref} style={style} data-placement={placement}>
                                    <Box color="primary" bgcolor="secondary" component="div" p={2} className={styles.popperContainer}>
                                        {this.props.children}
                                        <div ref={arrowProps.ref} style={arrowProps.style} />
                                    </Box>
                                </div>
                            )}
                        </Popper>),
                        this.state.elementForPopper)
                    }
                </Manager>
            )
        }
    }
}