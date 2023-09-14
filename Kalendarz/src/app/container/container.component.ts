import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  currentDate: string = "";
  currentHour: string = "";
  description: string = "";
  title: string = "";

  onDateChange(newDateValue: string) {
    console.log('Date changed to:', newDateValue);
   
  }
  onHourChange(newHourValue: string) {
    console.log('Hour changed to:', newHourValue);
   
  }
  getValues(data: any) {
    return data
  }

  constructor(private http: HttpClient){}
  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'dupa1234',
    });

    this.http.post<any>('https://kalendarz-zsen.web.app/kalendarz', this.getValues ,{ headers } ).subscribe(data => {
      console.log(data);
    });
  }
}

