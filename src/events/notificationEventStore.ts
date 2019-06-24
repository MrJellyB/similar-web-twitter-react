import {Subject} from "rxjs";

class NotificationEventStore {
    public readonly notifySuccess: Subject<string> = new Subject();
    public readonly notifyError: Subject<string> = new Subject();
}

export default new NotificationEventStore();