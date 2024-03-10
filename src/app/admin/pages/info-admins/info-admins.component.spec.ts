import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdminsComponent } from './info-admins.component';

describe('InfoAdminsComponent', () => {
  let component: InfoAdminsComponent;
  let fixture: ComponentFixture<InfoAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
