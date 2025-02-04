import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, User } from '../../../../core/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = { id: 0, name: '', email: '', phone: '', password: '', role: 'user', status: 'active' };
  isSubmitting = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.usersService.getUserById(userId).subscribe(user => {
        if (user) {
          this.user = user;
        }
      });
    }
  }

  updateUser(): void {
    this.isSubmitting = true;
    this.usersService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirigir a la lista después de actualizar
    });
  }
}
