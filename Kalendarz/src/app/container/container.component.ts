import { Component, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContainerFormService } from './container-form.service';
import { SharedDataService } from '../wyslij-eventy.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent {
  private events: any;
  currentDate = '';
  currentHour = '';
  description = '';
  title = '';
  disableInput = false;
  isCalendarVisible = false;
  pokaKalendarz = false;
  @ViewChild('Form') form: NgForm | undefined; // Reference to the form

  constructor(
    private eventData: ContainerFormService,
    private sharedDataService: SharedDataService
  ) {
    this.initializeEvents();
  }

  private initializeEvents() {
    this.eventData.events().subscribe((data) => {
      this.events = data;
    });
  }

  wyslij() {
    if (this.form) {
      this.form.ngSubmit.emit(); // Manually emit the ngSubmit event
    }
    // Your toggleCalendar logic here
  }

  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
    // console.log("poszlo")
  }

  onDateChange(newDateValue: string) {
    console.log('Date changed to:', newDateValue);
  }

  onHourChange(newHourValue: string) {
    this.currentHour = newHourValue;
    console.log('Hour changed to:', newHourValue);
  }

  triggerComponentB() {
    this.sharedDataService.triggerUpdate();
  }

  getValues(data: any) {
    console.log(data);
    const data2 = JSON.stringify(data);

    this.eventData.saveEvent(data).subscribe((res) => {
      console.log(res);
      this.triggerComponentB();
    });
  }
  wlaczKal(tryb:number){
    if(tryb == 1){
    this.pokaKalendarz = true;
    }
    else{
      this.pokaKalendarz = false;
    }
  }

  ngOnInit() {
    this.triggerComponentB();
  }
}
