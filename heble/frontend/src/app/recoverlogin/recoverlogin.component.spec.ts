import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverloginComponent } from './recoverlogin.component';

describe('RecoverloginComponent', () => {
  let component: RecoverloginComponent;
  let fixture: ComponentFixture<RecoverloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
