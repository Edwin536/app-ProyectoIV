import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/Cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guardar-cliente',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './guardar-cliente.component.html',
  styleUrl: './guardar-cliente.component.css'
})
export class GuardarClienteComponent {
  // Variables del form.
  public cargando: boolean = false;

  // Definir los campos del formulario.
  public nombre: FormControl;
  public apellido: FormControl;
  public pasaporte: FormControl;
  public nacionalidad: FormControl;
  public correo: FormControl;
  public telefono: FormControl;
  public estado: FormControl; 


  public formulario: FormGroup;

  constructor(private servicio: ClienteService, private router: Router) {
    this.nombre = new FormControl('', Validators.required);
    this.apellido = new FormControl('', Validators.required);
    this.pasaporte = new FormControl('', Validators.required);
    this.nacionalidad = new FormControl('', Validators.required);
    this.correo = new FormControl('', Validators.required);
    this.telefono = new FormControl('', Validators.required);
    this.estado = new FormControl(true, Validators.required); 

    this.formulario = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      pasaporte: this.pasaporte,
      nacionalidad: this.nacionalidad,
      correo: this.correo,
      telefono: this.telefono,
      estado: this.estado 
    });
  }

  public Guardar(): void {
    
    this.cargando = true;

   
    const Cliente = {
      idCliente: 0,
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      pasaporte: this.pasaporte.value,
      nacionalidad: this.nacionalidad.value,
      correo: this.correo.value,
      telefono: this.telefono.value,
      estado: this.estado.value 
    } as Cliente;

    this.servicio.Guardar(Cliente).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: "Aviso",
            text: "Se guardó correctamente el Cliente.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: "No se pudo guardar el Cliente, intente nuevamente.",
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
        this.router.navigate(["/clientes"]);
      }
    });
  }
}
