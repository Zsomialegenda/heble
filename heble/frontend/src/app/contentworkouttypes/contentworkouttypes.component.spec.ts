import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentworkouttypesComponent } from './contentworkouttypes.component';

describe('ContentworkouttypesComponent', () => {
  let component: ContentworkouttypesComponent;
  let fixture: ComponentFixture<ContentworkouttypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentworkouttypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentworkouttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
