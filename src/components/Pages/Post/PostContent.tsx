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

    getAuthorInitials(displayName: string): string {
        return displayName.split(' ').map(w => w.toUpperCase()[0]).join('');
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.post.title}
                    avatar={
                        <Avatar>
                            {this.props.post.author.displayName != null ?
                                this.getAuthorInitials(this.props.post.author.displayName) : ""}
                        </Avatar>
                    }
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