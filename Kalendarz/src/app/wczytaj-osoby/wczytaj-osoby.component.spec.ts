import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WczytajOsobyComponent } from './wczytaj-osoby.component';

describe('WczytajOsobyComponent', () => {
  let component: WczytajOsobyComponent;
  let fixture: ComponentFixture<WczytajOsobyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WczytajOsobyComponent]
    });
    fixture = TestBed.createComponent(WczytajOsobyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
