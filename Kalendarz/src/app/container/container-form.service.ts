import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ContainerFormService {
    url = "https://kalendarz-zsen.web.app/kalendarz"

    constructor(private http: HttpClient) {}

    events() {
        return this.http.get(this.url)
    }
    saveEvent(data: any) {
        const headers = new HttpHeaders({
            'Authorization': 'dupa1234', 
          });
        return this.http.post(this.url,data,{ headers })
    }
}