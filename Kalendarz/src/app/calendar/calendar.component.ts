import { Component, Input } from '@angular/core';

interface CalendarCell {
  date: Date | null;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Input() currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Starting with Monday

  get leadingSpaces(): CalendarCell[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    let dayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Adjust for Monday as the first day of the week
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }

    // Calculate the number of leading blank spaces
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
  }

  nextMonth() {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth = newMonth;
  }
}
