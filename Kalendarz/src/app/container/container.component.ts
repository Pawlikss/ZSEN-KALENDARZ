import { Component,HostListener,ViewChild} from '@angular/core';
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
  isCalendarVisible: boolean = false;
  @ViewChild('Form') form: NgForm | undefined; // Reference to the form


  constructor(private eventData: ContainerFormService) {
    this.eventData.events().subscribe((data) => {
      this.events = data;
    })
  }  
  
  wyslij() {
    if (this.form){
    this.form.ngSubmit.emit(); // Manually emit the ngSubmit event
    }
    // Your toggleCalendar logic here
  }
  
  toggleCalendar() {
    
    this.isCalendarVisible = !this.isCalendarVisible;
    console.log("poszlo")
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

