import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarReservaDesinoComponent } from './consultar-reserva-desino.component';

describe('ConsultarReservaDesinoComponent', () => {
  let component: ConsultarReservaDesinoComponent;
  let fixture: ComponentFixture<ConsultarReservaDesinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarReservaDesinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarReservaDesinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
