import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenthydrationComponent } from './contenthydration.component';

describe('ContenthydrationComponent', () => {
  let component: ContenthydrationComponent;
  let fixture: ComponentFixture<ContenthydrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenthydrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenthydrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
