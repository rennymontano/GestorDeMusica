import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInfoComponent } from './detalle-info.component';

describe('DetalleInfoComponent', () => {
  let component: DetalleInfoComponent;
  let fixture: ComponentFixture<DetalleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
