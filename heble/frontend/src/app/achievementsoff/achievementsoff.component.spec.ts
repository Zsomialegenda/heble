import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsoffComponent } from './achievementsoff.component';

describe('AchievementsoffComponent', () => {
  let component: AchievementsoffComponent;
  let fixture: ComponentFixture<AchievementsoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsoffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementsoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
