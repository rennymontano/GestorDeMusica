import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonEditarComponent } from './skeleton-editar.component';

describe('SkeletonEditarComponent', () => {
  let component: SkeletonEditarComponent;
  let fixture: ComponentFixture<SkeletonEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
