import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../wyslij-eventy.service';

@Component({
  selector: 'app-wczytaj-osoby',
  templateUrl: './wczytaj-osoby.component.html',
  styleUrls: ['./wczytaj-osoby.component.css'],
})
export class WczytajOsobyComponent implements OnInit {
  wydarzenia: any[] = [];
  isDataLoaded = false;
  kliknietyJakisEvent = false;
  czyPusto = false;
  kliknietyEvent = { nazwa: '', opis: '', data: '', godzina: '', id:''};

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.waznePamietajZebyZaktualizowac();
    this.sharedDataService.getUpdateObservable().subscribe(() => {
      this.waznePamietajZebyZaktualizowac();
    });
  }

  logWydarzenieData(wydarzenie: any) {
    console.log('Clicked wydarzenie:', wydarzenie);
    this.kliknietyJakisEvent = true;
    if (this.kliknietyEvent === wydarzenie) {
      this.kliknietyJakisEvent = false;
      this.kliknietyEvent = { nazwa: '', opis: '', data: '', godzina: '' ,id: ''};
      return;
    }
    this.kliknietyEvent = wydarzenie;
  }
  usunUzytkownika(kogo : any){
    console.log(kogo)
    kogo = {id:kogo}
    const headers = new HttpHeaders({
      Authorization: 'dupa1234',
    });
    this.kliknietyJakisEvent = false;
    this.http
    .delete<any>('https://kalendarz-zsen.web.app/usun', { headers:headers, body:kogo })
    .subscribe((data) => {
      console.log(data)
      this.waznePamietajZebyZaktualizowac()
  })
  
}

  waznePamietajZebyZaktualizowac() {
    const headers = new HttpHeaders({
      Authorization: 'dupa1234',
    });
    this.http
      .get<any>('https://kalendarz-zsen.web.app/baza', { headers })
      .subscribe((data) => {
        console.log(data)
        if (!data["wydarzenia"]){
          console.log("pusto")
          this.czyPusto = true
          this.isDataLoaded = false
          this.sharedDataService.updateWydarzenia([]);
          return
        }
        this.wydarzenia = Object.keys(data['wydarzenia']).map(
          (key) => data['wydarzenia'][key]
        );
        let i = 0;
        Object.keys(data["wydarzenia"]).forEach(element => {
          this.wydarzenia[i].id=element;
          i+=1
        });
        
        this.isDataLoaded = true;
        console.log(this.wydarzenia);
        this.wydarzenia.sort((a, b) => {
          const dateA = a.data.split('-').join('-');
          const dateB = b.data.split('-').join('-');
          return dateA.localeCompare(dateB);
        });
        this.sharedDataService.updateWydarzenia(this.wydarzenia);
      });
  }
}
