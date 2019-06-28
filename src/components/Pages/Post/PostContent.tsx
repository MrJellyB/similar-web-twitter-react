import * as React from "react";
import IPost from "../../../models/IPost";
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton} from "@material-ui/core";
import {Favorite} from '@material-ui/icons';

interface IProps {
    post: IPost
}

interface IState {

}

export default class PostContent extends React.Component<IProps,IState> {

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.post.title}
                    // avatar={
                    //     {/*TODO:We need to get user details back from posts service*/}
                    //     {/*<Avatar>*/}
                    //     {/*    {this.props.post.}*/}
                    //     {/*</Avatar>*/}
                    // }
                />
                <CardContent>
                    {this.props.post.body}
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton aria-label={"Like"} >
                        <Favorite />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}