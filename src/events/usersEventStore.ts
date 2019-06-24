import {BehaviorSubject} from "rxjs";
import IUser from "../models/IUser";

class UsersEventStore {
    public readonly currentUserEvent: BehaviorSubject<IUser|null> =
        new BehaviorSubject<IUser|null>(null);
}

export default new UsersEventStore()