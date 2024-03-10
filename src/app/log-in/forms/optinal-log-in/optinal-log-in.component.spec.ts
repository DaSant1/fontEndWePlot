import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptinalLogInComponent } from './optinal-log-in.component';

describe('OptinalLogInComponent', () => {
  let component: OptinalLogInComponent;
  let fixture: ComponentFixture<OptinalLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptinalLogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptinalLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
