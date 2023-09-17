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
  kliknietyEvent = { nazwa: '', opis: '', data: '', godzina: '' };

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
      this.kliknietyEvent = { nazwa: '', opis: '', data: '', godzina: '' };
      return;
    }
    this.kliknietyEvent = wydarzenie;
  }

  waznePamietajZebyZaktualizowac() {
    const headers = new HttpHeaders({
      Authorization: 'dupa1234',
    });
    this.http
      .get<any>('https://kalendarz-zsen.web.app/baza', { headers })
      .subscribe((data) => {
        this.wydarzenia = Object.keys(data['wydarzenia']).map(
          (key) => data['wydarzenia'][key]
        );
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
