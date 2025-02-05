import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService, Client } from '../../../../core/services/clients.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Partial<Client> = { name: '', email: '', phone: '', status: 'active' };
  clientId!: number;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clientId) {
      this.clientsService.getClientById(this.clientId).subscribe(client => {
        if (client) {
          this.client = client;
        }
      });
    }
  }

  updateClient(): void {
    if (this.clientId) {
      this.alertService.confirmUpdate(() => { // Usar SweetAlert2 como confirmación
        this.clientsService.updateClient(this.clientId, this.client).subscribe({
          next: () => {
            this.alertService.success('Actualizado', 'Cliente actualizado con éxito').then(() => {
              this.router.navigate(['/clients']); // Redirigir después de cerrar la alerta
            });
          },
          error: () => {
            this.alertService.error('Error', 'No se pudo actualizar el cliente');
          }
        });
      });
    }
  }
}
