import {BehaviorSubject, Subject} from "rxjs";
import IUser from "../models/IUser";
import {ILoggedInUser} from "../models/ILoggedInUser";

class UsersEventStore {
    public readonly currentUserEvent: BehaviorSubject<IUser|ILoggedInUser|null> =
        new BehaviorSubject<IUser|null>(null);
    public readonly userLogOutEvent: Subject<void> = new Subject();
}

export default new UsersEventStore()