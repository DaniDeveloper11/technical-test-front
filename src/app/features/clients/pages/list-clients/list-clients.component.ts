import { Component, OnInit } from '@angular/core';
import { ClientsService, Client } from '../../../../core/services/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientsService.getClients().subscribe((clients: Client[]) => { // 👈 Agregar el tipo explícitamente
      this.clients = clients;
    });
  }

  deleteClient(id: number): void {
    this.clientsService.deleteClient(id).subscribe(() => {
      this.fetchClients();
    });
  }
}
