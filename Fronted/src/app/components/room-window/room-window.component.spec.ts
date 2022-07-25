import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWindowComponent } from './room-window.component';

describe('RoomWindowComponent', () => {
  let component: RoomWindowComponent;
  let fixture: ComponentFixture<RoomWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
