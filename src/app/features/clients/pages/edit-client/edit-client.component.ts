import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService, Client } from '../../../../core/services/clients.service';

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
    private router: Router
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
      this.clientsService.updateClient(this.clientId, this.client).subscribe(() => {
        this.router.navigate(['/clients']); // Redirigir a la lista después de actualizar
      });
    }
  }
}
