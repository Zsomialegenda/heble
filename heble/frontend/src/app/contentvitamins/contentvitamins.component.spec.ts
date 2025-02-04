import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentvitaminsComponent } from './contentvitamins.component';

describe('ContentvitaminsComponent', () => {
  let component: ContentvitaminsComponent;
  let fixture: ComponentFixture<ContentvitaminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentvitaminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentvitaminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
