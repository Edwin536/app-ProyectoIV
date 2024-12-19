
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PaisService } from '../../../services/pais.service';
import { Cliente } from '../../../models/Cliente';
import { ReservaService } from '../../../services/reserva.service';

@Component({
  selector: 'app-guardar-reserva',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './guardar-reserva.component.html',
  styleUrl: './guardar-reserva.component.css'
})
export class GuardarReservaComponent implements AfterViewInit {
  // Variables del form.
  public cargando: boolean = false;
  public arrCliente: Cliente[] = [];

  // Definir los campos del formulario.
  public nombre: FormControl;
  public descripcion: FormControl;
  public pais: FormControl;



  public formulario: FormGroup;

  constructor(private servicio: ReservaService, private svCliente: PaisService, private router: Router) {
    this.nombre = new FormControl('', Validators.required);
    this.descripcion = new FormControl('', Validators.required);
    this.pais = new FormControl('', Validators.required);
    

    this.formulario = new FormGroup({
      nombre: this.nombre,
      descripcion: this.descripcion,
      pais: this.pais,
    });
  }

  ngAfterViewInit(): void {
    this.svCliente.Listar().subscribe({
      next: (resp: Cliente[]) => {
        this.arrCliente = resp;
      }
    });
  }

  public Guardar(): void {
    
    this.cargando = true;

   
    const reserva = {
      idReserva: 0,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      estado: true,
      pais: {
        idPais: this.pais.value
      } as Cliente
       
    } as Cliente;

    this.servicio.Guardar(reserva).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: "Aviso",
            text: "Se guardó correctamente el reserva.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: "No se pudo guardar el reserva, intente nuevamente.",
            icon: "warning",
            confirmButtonText: "Aceptar"
          });
        }
      },
      error: (e: any) => {
        Swal.fire({
          title: "Aviso",
          text: `Ocurrió un error en el proceso, referencia de respuesta: ${e.message}`,
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      },
      complete: () => {
        this.cargando = false;
        this.router.navigate(["/destinos"]);
      }
    });
  }
}