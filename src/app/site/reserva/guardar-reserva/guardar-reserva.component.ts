import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Reserva } from '../../../models/Reserva';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-guardar-reserva',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './guardar-reserva.component.html',
  styleUrl: './guardar-reserva.component.css',
})
export class GuardarReservaComponent {
  // Variables del form.
  public cargando: boolean = false;
  public arrCliente: Cliente[] = [];

  // Definir los campos del formulario.
  public fecha_ida: FormControl;
  public fecha_regreso: FormControl;
  public precio: FormControl;
  public estado: FormControl;
  public cliente: FormControl;

  public formulario: FormGroup;

  constructor(
    private servicio: ReservaService,
    private svCliente: ClienteService,
    private router: Router
  ) {
    this.fecha_ida = new FormControl('', Validators.required);
    this.fecha_regreso = new FormControl('', Validators.required);
    this.precio = new FormControl('', Validators.required);
    this.estado = new FormControl(true, Validators.required);
    this.cliente = new FormControl('', Validators.required);

    this.formulario = new FormGroup({
      fecha_ida: this.fecha_ida,
      fecha_regreso: this.fecha_regreso,
      precio: this.precio,
      estado: this.estado,
      cliente: this.cliente,
    });
  }

  ngAfterViewInit(): void {
    this.svCliente.Listar().subscribe({
      next: (resp: Cliente[]) => {
        this.arrCliente = resp;
      },
    });
  }

  public Guardar(): void {
    this.cargando = true;

    const reserva = {
      idReserva: 0,
      fecha_ida: this.fecha_ida.value,
      fecha_regreso: this.fecha_regreso.value,
      precio: this.precio.value,
      estado: true,
      cliente: {
        idCliente: this.cliente.value,
      } as Cliente

    } as Reserva;

    this.servicio.Guardar(reserva).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: 'Aviso',
            text: 'Se guardó correctamente el Reserva.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          Swal.fire({
            title: 'Aviso',
            text: 'No se pudo guardar el Reserva, intente nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
          });
        }
      },
      error: (e: any) => {
        Swal.fire({
          title: 'Aviso',
          text: `Ocurrió un error en el proceso, referencia de respuesta: ${e.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
      complete: () => {
        this.cargando = false;
        this.router.navigate(['/reservas']);
      },
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
