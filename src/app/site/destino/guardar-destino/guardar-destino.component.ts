
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { DestinoService } from '../../../services/destino.service';
import { Destino } from '../../../models/Destino';
import { Pais } from '../../../models/Pais';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-guardar-destino',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './guardar-destino.component.html',
  styleUrl: './guardar-destino.component.css'
})
export class GuardarDestinoComponent implements AfterViewInit {
  // Variables del form.
  public cargando: boolean = false;
  public arrPais: Pais[] = [];

  // Definir los campos del formulario.
  public nombre: FormControl;
  public descripcion: FormControl;
  public pais: FormControl;



  public formulario: FormGroup;

  constructor(private servicio: DestinoService, private svPais: PaisService, private router: Router) {
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
    this.svPais.Listar().subscribe({
      next: (resp: Pais[]) => {
        this.arrPais = resp;
      }
    });
  }

  public Guardar(): void {
    
    this.cargando = true;

   
    const destino = {
      idDestino: 0,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      estado: true,
      pais: {
        idPais: this.pais.value
      } as Pais
       
    } as Destino;

    this.servicio.Guardar(destino).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          Swal.fire({
            title: "Aviso",
            text: "Se guardó correctamente el destino.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Aviso",
            text: "No se pudo guardar el destino, intente nuevamente.",
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