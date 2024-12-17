import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlojamientoComponent } from './listar-alojamiento.component';

describe('ListarAlojamientoComponent', () => {
  let component: ListarAlojamientoComponent;
  let fixture: ComponentFixture<ListarAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAlojamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
