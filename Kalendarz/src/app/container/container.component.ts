import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ContainerFormService } from './container-form.service';

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
  events: any;
  disableInput: boolean = false;

  constructor(private eventData: ContainerFormService) {
    this.eventData.events().subscribe((data) => {
      this.events = data;
    })
  }

  onDateChange(newDateValue: string) {
    console.log('Date changed to:', newDateValue);
   
  }
  onHourChange(newHourValue: string) {
    this.currentHour = newHourValue;
    console.log('Hour changed to:', newHourValue);
   
  }
  getValues(data: any) {
    console.log(data)
    const data2 = JSON.stringify(data)
    this.eventData.saveEvent(data).subscribe((res) => {
      console.log(res)
    })
  }
}

