import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SharedDataService } from '../wyslij-eventy.service';

interface CalendarCell {
  date: Date | null;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(
    private sharedDataService: SharedDataService,
    private renderer: Renderer2
  ) {}

  @Input() currentMonth: Date = new Date();
  @Input() isCalendarVisible: boolean | undefined;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('calendar') calendar: ElementRef | undefined;

  wydarzenia: any[] = [];
  wybranaDataWKalendarzu: boolean = false;
  modifiedDate: Date = new Date(1);
  clickedEvents: any[] = [];

  daysOfWeek: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
  
  miesiac_jaki_mamy: string = this.currentMonth.toLocaleString('pl-PL', { month: 'long' }) + "<br>" + this.currentMonth.getFullYear();

  ngOnInit() {
    this.sharedDataService.wydarzenia$.subscribe(data => {
      this.wydarzenia = data;
      // Handle data updates here
    });
  }

  cellClicked(date: Date | null) {
    // console.log(date);

    if (date) {
      if (date.getDate() === this.modifiedDate.getDate() && this.wybranaDataWKalendarzu) {
        this.wybranaDataWKalendarzu = false; // he he
        return;
      }

      const ostatni = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (date.getDay() !== ostatni.getDay() || true) {
        this.modifiedDate = new Date(date);
        this.modifiedDate.setDate(this.modifiedDate.getDate());
        date.setDate(this.modifiedDate.getDate());
      }
    }

    this.wybranaDataWKalendarzu = true;
    this.clickedEvents = [];

    if (date) {
      const dateString = (new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())).toISOString()).split("T")[0];
      const matchingWydarzenia = this.wydarzenia.filter(
        (event) => event.data === dateString
      );

      // console.log(date);
      // console.log((new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())).toISOString()).split("T")[0]);      
      // console.log(dateString)

      if (matchingWydarzenia.length > 0) {
        this.clickedEvents = matchingWydarzenia;
      }
    }
  }

  get leadingSpaces(): CalendarCell[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    let dayOfWeek = firstDay.getDay();

    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

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

    for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
      dates.push({ date: new Date(date) });
    }

    const daysToAdd = 7 - ((lastDay.getDay()) % 7);

    for (let i = 1; i <= daysToAdd; i++) {
      dates.push({ date: new Date(year, month + 1, i) });
    }

    return dates;
  }

  previousMonth(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.currentMonth = newMonth;
    this.miesiac_jaki_mamy = this.currentMonth.toLocaleString('pl-PL', { month: 'long' }) + "<br>" + this.currentMonth.getFullYear();
  }

  nextMonth(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.isCalendarVisible = false;
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth = newMonth;
    this.miesiac_jaki_mamy = this.currentMonth.toLocaleString('pl-PL', { month: 'long' }) + "<br>" + this.currentMonth.getFullYear();
    // console.log(this.wydarzenia[0]["data"]);
  }

  isDateInWydarzenia(date: Date): boolean {
    const modifiedDate = new Date(date);
    modifiedDate.setDate(modifiedDate.getDate() + 1);
    const dateString = modifiedDate.toISOString().split('T')[0];
    return this.wydarzenia.some(event => event.data === dateString);
  }

  openAssociatedEvents() {
    this.wybranaDataWKalendarzu = true;
  }

  closePopup() {
    this.wybranaDataWKalendarzu = false;
  }

  toggleCalendar() {
    this.toggle.emit();
  }
}
