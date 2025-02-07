import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentdrinksComponent } from './contentdrinks.component';

describe('ContentdrinksComponent', () => {
  let component: ContentdrinksComponent;
  let fixture: ComponentFixture<ContentdrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentdrinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentdrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
