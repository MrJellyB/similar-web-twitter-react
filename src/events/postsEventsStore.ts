import {BehaviorSubject} from "rxjs";
import IPost from "../models/IPost";

class PostsEventsStore {
    public readonly onPostSubmitted: BehaviorSubject<IPost|null> =
        new BehaviorSubject<IPost|null>(null);
}

export default new PostsEventsStore();