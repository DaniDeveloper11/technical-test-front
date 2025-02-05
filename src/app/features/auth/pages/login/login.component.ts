import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { UsersService,User } from '../../../../core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users: User[]=[]
  isSubmitting: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage : string = ''


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private usersService: UsersService
  ) {}
  ngOnInit():void{
    this.getUsers();
    console.log(this.users)
  }



  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.alertService.success('¡Bienvenido!', 'Has iniciado sesión correctamente.').then(() => {
          this.router.navigate(['/home']); // Redirigir a home después de cerrar la alerta
        });
      },
      error: () => {
        this.alertService.error('Error', 'Correo o contraseña incorrectos.');
        this.errorMessage = 'Invalid email or password';
        this.isSubmitting = false;
      }
    });
  }
  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users; // Guardar la lista de usuarios en la variable
        console.log('Usuarios obtenidos:', this.users); // 👈 Depuración en consola
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.alertService.error('Error', 'No se pudieron obtener los usuarios.');
      }
    });
  }

}
