import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreecontentComponent } from './freecontent.component';

describe('FreecontentComponent', () => {
  let component: FreecontentComponent;
  let fixture: ComponentFixture<FreecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreecontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
