import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsleepingComponent } from './contentsleeping.component';

describe('ContentsleepingComponent', () => {
  let component: ContentsleepingComponent;
  let fixture: ComponentFixture<ContentsleepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentsleepingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsleepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
