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
            'Authorization': 'ZHVwYTEyMzQKZHVwYTEyMzQ=', 
          });
        return this.http.get(this.url2,{headers})
    }
    saveEvent(data: any) {
        const headers = new HttpHeaders({
            'Authorization': 'ZHVwYTEyMzQKZHVwYTEyMzQ=', 
          });


          const result = this.http.post(this.url,data,{ headers });
        // magiczna sztuczka polegająca na po prostu odczytaniu rzeczy z bazy XDDD
        // czego to człowiek nie zrobi zeby miec FIREBASE REALTIMEDATABASE 
        // ^ btw tą sztuczkę trzeba robić za kazdym razem jak odswiezamy baze. meh
        // narazie nie działa ofc   
        // juz działa 30 sekund później, zapomnialem sparsować danych
          this.http.get<any>('https://kalendarz-zsen.web.app/baza',  { headers } ).subscribe(data => {
            // this.text1 = data.message;
            let wydarzenia;
            wydarzenia = Object.keys(data["wydarzenia"]).map(key => data["wydarzenia"][key]); // pierdolone obiekty i ich losowe nazwy
            
            
            wydarzenia.sort((a: { data: string; }, b: { data: string; }) => {
            const dateA = a.data.split("-").join("-");
            const dateB = b.data.split("-").join("-");
            return dateA.localeCompare(dateB);
            });
     this.sharedDataService.updateWydarzenia(wydarzenia);
     alert("dodano: 👍")
        });
        
        return result
    }
}