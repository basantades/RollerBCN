import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocidadGraficoComponent } from './velocidad-grafico.component';

describe('VelocidadGraficoComponent', () => {
  let component: VelocidadGraficoComponent;
  let fixture: ComponentFixture<VelocidadGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VelocidadGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VelocidadGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
