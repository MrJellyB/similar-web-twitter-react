import {BehaviorSubject, Subject} from "rxjs";
import IUser from "../models/IUser";

class UsersEventStore {
    public readonly currentUserEvent: BehaviorSubject<IUser|null> =
        new BehaviorSubject<IUser|null>(null);
    public readonly userLogOutEvent: Subject<void> = new Subject();
}

export default new UsersEventStore()