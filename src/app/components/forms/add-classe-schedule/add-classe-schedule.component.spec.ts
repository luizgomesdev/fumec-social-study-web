import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasseScheduleComponent } from './add-classe-schedule.component';

describe('AddClasseScheduleComponent', () => {
  let component: AddClasseScheduleComponent;
  let fixture: ComponentFixture<AddClasseScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClasseScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClasseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
