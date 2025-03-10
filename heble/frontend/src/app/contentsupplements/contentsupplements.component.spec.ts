import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsupplementsComponent } from './contentsupplements.component';

describe('ContentsupplementsComponent', () => {
  let component: ContentsupplementsComponent;
  let fixture: ComponentFixture<ContentsupplementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentsupplementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsupplementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
