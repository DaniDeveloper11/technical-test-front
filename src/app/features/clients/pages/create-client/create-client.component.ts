import { Component } from '@angular/core';
import { ClientsService, Client } from '../../../../core/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  client: Omit<Client, 'id' | 'createdAt'> = {
    name: '',
    email: '',
    phone: '',
    status: 'active'
  };

  constructor(private clientsService: ClientsService, private router: Router) {}

  createClient(): void {
    if (this.isValidClient()) {
      this.clientsService.createClient(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  isValidClient(): boolean {
    return !!this.client.name && !!this.client.email && !!this.client.phone;
  }
}
