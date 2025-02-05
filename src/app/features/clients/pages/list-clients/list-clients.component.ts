import { Component, OnInit } from '@angular/core';
import { ClientsService, Client } from '../../../../core/services/clients.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = []
  searchQuery: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private clientsService: ClientsService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientsService.getClients().subscribe((clients: Client[]) => { //  Agregar el tipo explícitamente
      this.clients = clients;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredClients = this.clients.filter(client => {
      return (
        (this.searchQuery === '' || client.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.statusFilter === '' || client.status === this.statusFilter)
      );
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  deleteClient(clientId: number): void {
    this.alertService.confirmDelete(() => {
      this.clientsService.deleteClient(clientId).subscribe({
        next: () => {
          this.alertService.success('Eliminado', 'Cliente eliminado con éxito');
          this.fetchClients(); // Recargar la lista
        },
        error: () => {
          this.alertService.error('Error', 'No se pudo eliminar el cliente');
        }
      });
    });
  }
  getTotalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filteredClients.length / this.itemsPerPage) }, (_, i) => i + 1);
  }
}
