import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPreguntasComponent } from './info-preguntas.component';

describe('InfoPreguntasComponent', () => {
  let component: InfoPreguntasComponent;
  let fixture: ComponentFixture<InfoPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPreguntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
