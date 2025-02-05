import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentworkoutComponent } from './contentworkout.component';

describe('ContentworkoutComponent', () => {
  let component: ContentworkoutComponent;
  let fixture: ComponentFixture<ContentworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentworkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
