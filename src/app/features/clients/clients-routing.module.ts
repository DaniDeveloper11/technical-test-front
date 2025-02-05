import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

const routes: Routes = [
  {path:'', component: LayoutComponent,
  children:[
    { path: '', component: ListClientsComponent },
  { path: 'create', component: CreateClientComponent },
  { path: 'edit/:id', component: EditClientComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
