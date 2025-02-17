import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCancionesComponent } from './listado-canciones.component';

describe('ListadoCancionesComponent', () => {
  let component: ListadoCancionesComponent;
  let fixture: ComponentFixture<ListadoCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCancionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
