import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaisService } from '../../../services/pais.service';
import { Pais } from '../../../models/Pais';


@Component({
  selector: 'app-actualizar-pais',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar-pais.component.html',
  styleUrl: './actualizar-pais.component.css'
})
export class ActualizarPaisComponent implements AfterViewInit, OnInit {
  private idPais: number = 0;
  public cargando: boolean = false;
  
  // Definir los campos del formulario.
  public nombre: FormControl;
  public codigoPais: FormControl;
  
  

  // Definir el formulario.
  public formulario: FormGroup;

  constructor(private servicio: PaisService, private router: Router, private activeRoute: ActivatedRoute) {
    this.nombre = new FormControl('', Validators.required);
    this.codigoPais = new FormControl('', Validators.required);
    this.formulario = new FormGroup({
      nombre: this.nombre,
      codigoPais: this.codigoPais,
    });
  }

  ngAfterViewInit(): void {
    this.servicio.Consultar(this.idPais).subscribe({
      next: (pais: Pais) => {
        this.nombre.setValue(pais.nombre);
        this.codigoPais.setValue(pais.codigoPais);
      
      }
    });
  }

  ngOnInit(): void {
    // Obetener el Id que viene en la URL.
    if (this.activeRoute.snapshot.paramMap.get('id') != null && this.activeRoute.snapshot.paramMap.get('id') != '0' &&
      typeof this.activeRoute.snapshot.paramMap.get('id') != 'undefined') {
      this.idPais = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
    } else {
      this.router.navigate(['/Paises']);
    }
  }

  public Guardar(): void {
    // Asignar el estado del efecto del botón.
    this.cargando = true;
    
    // Construir el objeto.
    const Pais = {
      idPais: this.idPais,
      nombre: this.nombre.value,
      codigoPais: this.codigoPais.value,
    } as Pais;

    this.servicio.Actualizar(Pais).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: "Aviso",
            text: "Se actualizó correctamente el pais.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: "No se pudo actualizar el pais, intente nuevamente.",
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
