import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class DataService {
    public downloadUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public downloadUrl$ = this.downloadUrl.asObservable();
    constructor() {}
}