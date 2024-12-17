import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PaisService } from '../../../services/pais.service';
import { Pais } from '../../../models/Pais';

@Component({
  selector: 'app-guardar-pais',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './guardar-pais.component.html',
  styleUrl: './guardar-pais.component.css'
})
export class GuardarPaisComponent {
  // Variables del form.
  public cargando: boolean = false;

  // Definir los campos del formulario.
  public nombre: FormControl;
  public codigoPais: FormControl;
  


  public formulario: FormGroup;

  constructor(private servicio: PaisService, private router: Router) {
    this.nombre = new FormControl('', Validators.required);
    this.codigoPais = new FormControl('', Validators.required); 

    this.formulario = new FormGroup({
      nombre: this.nombre,
      codigoPais: this.codigoPais
    });
  }

  public Guardar(): void {
    
    this.cargando = true;

   
    const Pais = {
      idPais: 0,
      nombre: this.nombre.value,
      codigoPais: this.codigoPais.value
    } as Pais;

    this.servicio.Guardar(Pais).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: "Aviso",
            text: "Se guardó correctamente el pais.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: "No se pudo guardar el pais, intente nuevamente.",
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
        this.router.navigate(["/paises"]);
      }
    });
  }
}
