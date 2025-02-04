import { Component } from '@angular/core';
import { UsersService, User } from '../../../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User = { id: 0, name: '', email: '', phone: '', password: '', role: 'user', status: 'active' };
  isSubmitting = false;

  constructor(private usersService: UsersService, private router: Router) {}

  createUser(): void {
    this.isSubmitting = true;
    this.usersService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirigir a la lista después de crear
    });
  }
}
