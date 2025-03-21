import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAchievementComponent } from './admin-achievement.component';

describe('AdminAchievementComponent', () => {
  let component: AdminAchievementComponent;
  let fixture: ComponentFixture<AdminAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAchievementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
