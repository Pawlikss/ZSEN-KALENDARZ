import { Component } from '@angular/core';

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
}

