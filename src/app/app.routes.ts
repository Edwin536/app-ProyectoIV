import { Routes } from '@angular/router';
import { InicioComponent } from './site/inicio/inicio.component';
import { ListarClienteComponent } from './site/cliente/listar-cliente/listar-cliente.component';
import { GuardarClienteComponent } from './site/cliente/guardar-cliente/guardar-cliente.component';
import { ActualizarClienteComponent } from './site/cliente/actualizar-cliente/actualizar-cliente.component';
import { ActualizarPaisComponent } from './site/pais/actualizar-pais/actualizar-pais.component';
import { GuardarPaisComponent } from './site/pais/guardar-pais/guardar-pais.component';
import { ListarPaisComponent } from './site/pais/listar-pais/listar-pais.component';
import { GuardarDestinoComponent } from './site/destino/guardar-destino/guardar-destino.component';

export const routes: Routes = [
    { path: "inicio", title: "Inicio - Gestión Reservas", component: InicioComponent },
    { path: "clientes", title: "Cliente - Gestion Cliente", component: ListarClienteComponent},
    { path: "clientes/guardar", title: "Guardar Cliente - Gestión Cliente", component: GuardarClienteComponent },
    { path: "clientes/actualizar/:id", title: "Actualizar Material - Gestión Clientes", component: ActualizarClienteComponent },
    { path: "paises", title: "Pais - Gestion Pais", component: ListarPaisComponent},
    { path: "paises/guardar", title: "Guardar Pais - Gestión Paises", component: GuardarPaisComponent },
    { path: "paises/actualizar/:id", title: "Actualizar Pais - Gestión Clientes", component: ActualizarPaisComponent },
    { path: "destinos/guardar", title: "Guardar Destino - Gestión Destinos", component: GuardarDestinoComponent },
    { path: "", pathMatch: "full", redirectTo: "/inicio" }
];
