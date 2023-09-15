import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SharedDataService } from "../wyslij-eventy.service";

@Injectable({
    providedIn: 'root',
})
export class ContainerFormService {
    url = "https://kalendarz-zsen.web.app/kalendarzTest"
    url2 = "https://kalendarz-zsen.web.app/baza"

    constructor(private http: HttpClient,private sharedDataService: SharedDataService) {}

    events() {
        const headers = new HttpHeaders({
            'Authorization': 'dupa1234', 
          });
        return this.http.get(this.url2,{headers})
    }
    saveEvent(data: any) {
        const headers = new HttpHeaders({
            'Authorization': 'dupa1234', 
          });


          const result = this.http.post(this.url,data,{ headers });
        // magiczna sztuczka polegająca na po prostu odczytaniu rzeczy z bazy XDDD
        // czego to człowiek nie zrobi zeby miec FIREBASE REALTIMEDATABASE 
        // narazie nie działa ofc
        //   this.http.get<any>('https://kalendarz-zsen.web.app/baza',  { headers } ).subscribe(data => {
        //     // this.text1 = data.message;
        //     this.sharedDataService.updateWydarzenia(data)
        // });
        
        return result
    }
}