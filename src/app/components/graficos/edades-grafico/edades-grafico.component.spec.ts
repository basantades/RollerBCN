import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdadesGraficoComponent } from './edades-grafico.component';

describe('EdadesGraficoComponent', () => {
  let component: EdadesGraficoComponent;
  let fixture: ComponentFixture<EdadesGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdadesGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdadesGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
