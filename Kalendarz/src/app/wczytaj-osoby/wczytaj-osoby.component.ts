import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {SharedDataService } from "../wyslij-eventy.service"

@Component({
  selector: 'app-wczytaj-osoby',
  templateUrl: './wczytaj-osoby.component.html',
  styleUrls: ['./wczytaj-osoby.component.css']
})
export class WczytajOsobyComponent {
  wydarzenia: any[] =[]; //??????? array objektów to array? kto by sie spodziewał ....
  isDataLoaded = false;  //nie zaladowalol sie
  kliknietyJakisEvent = false;  //nie zaladowalol sie

  kliknietyEvent= {nazwa:"",opis:"",data:"",godzina:""};

  logWydarzenieData(wydarzenie: any) {
    console.log('Clicked wydarzenie:', wydarzenie);
    this.kliknietyJakisEvent = true;
    if (this.kliknietyEvent == wydarzenie){
      this.kliknietyJakisEvent = false;
      this.kliknietyEvent= {nazwa:"",opis:"",data:"",godzina:""};
      return
    }
    this.kliknietyEvent = wydarzenie;
    
  }
  waznePamietajZebyZaktualizowac(){
    const headers = new HttpHeaders({
      'Authorization': 'dupa1234', 
    });
    this.http.get<any>('https://kalendarz-zsen.web.app/baza',  { headers } ).subscribe(data => {
      // this.text1 = data.message;
   

      this.wydarzenia = Object.keys(data["wydarzenia"]).map(key => data["wydarzenia"][key]); // pierdolone obiekty i ich losowe nazwy
      this.isDataLoaded = true; // jak sie stronka zaladuje to zmien tekst
      console.log(this.wydarzenia)
      this.wydarzenia.sort((a: { data: string; }, b: { data: string; }) => {
        const dateA = a.data.split("-").join("-");
       const dateB = b.data.split("-").join("-");
       return dateA.localeCompare(dateB);
     });
     this.sharedDataService.updateWydarzenia(this.wydarzenia);
      // (Object.values(data["wydarzenia"])).forEach(element => {
      //   console.log(element)
      // });
   
    });
  }
  


  constructor(private http: HttpClient, private sharedDataService: SharedDataService){}

  
  ngOnInit() {
    this.waznePamietajZebyZaktualizowac()
    
  }
}
