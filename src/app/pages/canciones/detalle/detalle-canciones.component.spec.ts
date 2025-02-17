import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCancionesComponent } from './detalle-canciones.component';

describe('DetalleCancionesComponent', () => {
  let component: DetalleCancionesComponent;
  let fixture: ComponentFixture<DetalleCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCancionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
