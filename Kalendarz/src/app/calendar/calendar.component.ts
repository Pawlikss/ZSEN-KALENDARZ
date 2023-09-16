import { Component, Input } from '@angular/core';
import {SharedDataService } from "../wyslij-eventy.service"

interface CalendarCell {
  date: Date | null;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(private sharedDataService: SharedDataService) {}
  @Input() currentMonth: Date = new Date();
  wydarzenia: any[] = [];
  wybranaDataWKalendarzu: boolean = false;
  modifiedDate: Date = new Date(1);
  clickedEvents: any[] = [];
  // Define the cellClicked function to handle cell clicks
  cellClicked(date: Date | null) {
    
    
    
    if (date){
      if(date?.getDate()+1 == this.modifiedDate.getDate() && this.wybranaDataWKalendarzu ==true){
        this.wybranaDataWKalendarzu = false;
        return
      }
    this.modifiedDate = new Date(date); // Create a new Date object to avoid modifying the original date
    this.modifiedDate.setDate(this.modifiedDate.getDate() + 1);// Subtract one day by addign one kys
    
    date.setDate(this.modifiedDate.getDate()); 
    }
    
    this.wybranaDataWKalendarzu = true;
    this.clickedEvents = []; // Clear the clickedEvents array
    if (date) {
      // Find all the wydarzenia associated with the clicked date
      const dateString = date.toISOString().split('T')[0];
      const matchingWydarzenia = this.wydarzenia.filter(
        (event) => event.data === dateString
      );

      if (matchingWydarzenia.length > 0) {
        // Store the associated wydarzenia in the clickedEvents array
        this.clickedEvents = matchingWydarzenia;
        // Log the associated wydarzenia
        console.log('Clicked Date:', date);
        console.log('Associated Wydarzenia:', this.clickedEvents);
      } else {
        console.log('No Wydarzenie found for the clicked date:', date);
      }
    }
  }

  daysOfWeek: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
  miesiac_jaki_mamy=this.currentMonth.toLocaleString('pl-PL', { month: 'long' })+" "+this.currentMonth.getFullYear();
  
  get leadingSpaces(): CalendarCell[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    let dayOfWeek = firstDay.getDay();

    
    const leadingSpaces: CalendarCell[] = [];
    const previousMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = dayOfWeek - 1; i >= 0; i--) {
      leadingSpaces.push({ date: new Date(year, month - 1, previousMonthLastDay - i) });
    }

    return leadingSpaces;
  }

get dates(): CalendarCell[] {
  const year = this.currentMonth.getFullYear();
  const month = this.currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates: CalendarCell[] = [];

  // Generate dates for the current month
  for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
    dates.push({ date: new Date(date) });
  }

  // Check if the last day of the month is not a Saturday (6)
  if (lastDay.getDay() !== 6) {
    // Generate dates for the next month until the end of the week
    const nextMonth = (month + 1) % 12; // Calculate the next month
    const nextMonthYear = nextMonth === 0 ? year + 1 : year; // Handle year change
    const nextMonthFirstDay = new Date(nextMonthYear, nextMonth, 1);
    
    for (let date = new Date(nextMonthFirstDay); date.getDay() !== 0; date.setDate(date.getDate() + 1)) {
      dates.push({ date: new Date(date) });
    }
  }

  return dates;
}

  previousMonth() {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.currentMonth = newMonth;
    this.miesiac_jaki_mamy=this.currentMonth.toLocaleString('pl-PL', { month: 'long' })+" "+this.currentMonth.getFullYear();
    console.log(this.wydarzenia)
  }

  nextMonth() {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth = newMonth;
    this.miesiac_jaki_mamy=this.currentMonth.toLocaleString('pl-PL', { month: 'long' })+" "+this.currentMonth.getFullYear();
    console.log(this.wydarzenia[0]["data"])
  }
  isDateInWydarzenia(date: Date): boolean {
    const modifiedDate = new Date(date); // Create a new Date object to avoid modifying the original date
    modifiedDate.setDate(modifiedDate.getDate() + 1); // Subtract one day
    const dateString = modifiedDate.toISOString().split('T')[0]; // Convert modified date to yyyy-mm-dd format
    return this.wydarzenia.some(event => event.data === dateString);
  }
  
  

  ngOnInit() {
    // Subscribe to the observable to receive updates
    this.sharedDataService.wydarzenia$.subscribe(data => {
      this.wydarzenia = data;
      // Handle data updates here
    });
  }
}
