import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingoffComponent } from './coachingoff.component';

describe('CoachingoffComponent', () => {
  let component: CoachingoffComponent;
  let fixture: ComponentFixture<CoachingoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachingoffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachingoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
