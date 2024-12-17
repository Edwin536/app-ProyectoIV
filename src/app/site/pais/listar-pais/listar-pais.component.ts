import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Pais } from '../../../models/Pais';
import { PaisService } from '../../../services/pais.service';


@Component({
  selector: 'app-listar-Pais',
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressBarModule],
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css'] // Corregido 'styleUrl' por 'styleUrls'
})
export class ListarPaisComponent implements AfterViewInit {
  columnas: string[] = ["idPais", "nombre", "codigoPais"];
  datos: MatTableDataSource<Pais> = new MatTableDataSource<Pais>();

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(private service: PaisService) {}

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  private cargarTabla(): void {
    this.service.Listar().subscribe({
      next: (resp: Pais[]) => {
        this.datos = new MatTableDataSource<Pais>(resp);
        this.datos.paginator = this.paginador;
        this.datos.sort = this.ordenamiento;
      }
    });
  }

  public filtrar(contenido: string): void {
    this.datos.filter = contenido.trim().toLocaleLowerCase();
  }
}