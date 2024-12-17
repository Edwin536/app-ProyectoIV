import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressBarModule],
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'] // Corregido 'styleUrl' por 'styleUrls'
})
export class ListarClienteComponent implements AfterViewInit {
  columnas: string[] = ["idCliente", "nombre", "apellido", "pasaporte", "nacionalidad", "correo","telefono","estado"];
  datos: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(private service: ClienteService) {}

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  private cargarTabla(): void {
    this.service.Listar().subscribe({
      next: (resp: Cliente[]) => {
        this.datos = new MatTableDataSource<Cliente>(resp);
        this.datos.paginator = this.paginador;
        this.datos.sort = this.ordenamiento;
      }
    });
  }

  public filtrar(contenido: string): void {
    this.datos.filter = contenido.trim().toLocaleLowerCase();
  }
}

