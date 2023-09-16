import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,Subject  } from 'rxjs';

@Injectable()
export class SharedDataService {
  // Create a BehaviorSubject to hold and notify about changes to wydarzenia
  private wydarzeniaSubject = new BehaviorSubject<any[]>([]);


  wydarzenia$: Observable<any[]> = this.wydarzeniaSubject.asObservable();
  private triggerSubject = new Subject<void>();

  // Method to update wydarzenia and notify subscribers
  updateWydarzenia(data: any[]) {
    this.wydarzeniaSubject.next(data);
  }
  triggerUpdate() {
    this.triggerSubject.next();
  }
  getUpdateObservable() {
    return this.triggerSubject.asObservable();
  }
}
