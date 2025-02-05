import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListClientsComponent, CreateClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule
  ]
})
export class ClientsModule {}
