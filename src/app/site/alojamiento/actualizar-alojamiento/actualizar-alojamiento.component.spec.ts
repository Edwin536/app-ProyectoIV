import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAlojamientoComponent } from './actualizar-alojamiento.component';

describe('ActualizarAlojamientoComponent', () => {
  let component: ActualizarAlojamientoComponent;
  let fixture: ComponentFixture<ActualizarAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarAlojamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
