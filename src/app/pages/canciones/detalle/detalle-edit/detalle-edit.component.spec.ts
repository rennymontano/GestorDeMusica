import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEditComponent } from './detalle-edit.component';

describe('DetalleEditComponent', () => {
  let component: DetalleEditComponent;
  let fixture: ComponentFixture<DetalleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
