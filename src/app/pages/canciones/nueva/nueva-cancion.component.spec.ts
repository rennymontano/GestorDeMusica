import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCancionComponent } from './nueva-cancion.component';

describe('NuevaCancionComponent', () => {
  let component: NuevaCancionComponent;
  let fixture: ComponentFixture<NuevaCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCancionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
