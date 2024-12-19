import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-actualizar-reserva',
  imports: [],
  templateUrl: './actualizar-reserva.component.html',
  styleUrl: './actualizar-reserva.component.css'
})
export class ActualizarReservaComponent {
 private idReserva: number = 0;
   public cargando: boolean = false;
   public estado: boolean = false;
   
   // Definir los campos del formulario.
   public nombre: FormControl;
   public apellido: FormControl;
   public pasaporte: FormControl;
   public nacionalidad: FormControl;
   public correo: FormControl;
   public telefono: FormControl;
   
 
   // Definir el formulario.
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
     this.servicio.Consultar(this.idCliente).subscribe({
       next: (Cliente: Cliente) => {
         this.nombre.setValue(Cliente.nombre);
         this.apellido.setValue(Cliente.apellido);
         this.pasaporte.setValue(Cliente.pasaporte);
         this.nacionalidad.setValue(Cliente.nacionalidad);
         this.correo.setValue(Cliente.correo);
         this.telefono.setValue(Cliente.telefono);
         this.estado = Cliente.estado;
       }
     });
   }
 
   ngOnInit(): void {
     // Obetener el Id que viene en la URL.
     if (this.activeRoute.snapshot.paramMap.get('id') != null && this.activeRoute.snapshot.paramMap.get('id') != '0' &&
       typeof this.activeRoute.snapshot.paramMap.get('id') != 'undefined') {
       this.idCliente = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
     } else {
       this.router.navigate(['/Clientes']);
     }
   }
 
   public Guardar(): void {
     // Asignar el estado del efecto del botón.
     this.cargando = true;
     
     // Construir el objeto.
     const Cliente = {
       idCliente: this.idCliente,
       nombre: this.nombre.value,
       apellido: this.apellido.value,
       pasaporte: this.pasaporte.value,
       nacionalidad: this.nacionalidad.value,
       correo: this.correo.value,
       telefono: this.telefono.value,
       estado: this.estado
     } as Cliente;
 
     this.servicio.Actualizar(Cliente).subscribe({
       next: (resp: number) => {
         if (resp > 0) {
           Swal.fire({
             title: "Aviso",
             text: "Se actualizó correctamente el Cliente.",
             icon: "success",
             confirmButtonText: "Aceptar"
           });
         } else {
           Swal.fire({
             title: "Aviso",
             text: "No se pudo actualizar el Cliente, intente nuevamente.",
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
