import { Component } from '@angular/core';
import { ContainerFormService } from '../container/container-form.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  events:any = [];

  constructor(private eventData: ContainerFormService) {
    this.eventData.events().subscribe((data) => {
      this.events = Object.values(data);
      console.log(this.events)
    })
  }
}
