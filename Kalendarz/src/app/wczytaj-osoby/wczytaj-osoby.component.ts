import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-wczytaj-osoby',
  templateUrl: './wczytaj-osoby.component.html',
  styleUrls: ['./wczytaj-osoby.component.css']
})
export class WczytajOsobyComponent {
  wydarzenia: any[] =[]; //??????? array objektów to array? kto by sie spodziewał ....
  isDataLoaded = false;  //nie zaladowalol sie
  constructor(private http: HttpClient){}
  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': 'dupa1234', 
    });
    
    this.http.get<any>('https://kalendarz-zsen.web.app/baza',  { headers } ).subscribe(data => {
      // this.text1 = data.message;
   

      this.wydarzenia = Object.keys(data["wydarzenia"]).map(key => data["wydarzenia"][key]); // pierdolone obiekty i ich losowe nazwy
      this.isDataLoaded = true; // jak sie stronka zaladuje to zmien tekst
      
      // (Object.values(data["wydarzenia"])).forEach(element => {
      //   console.log(element)
      // });
   
    });
  }
}
