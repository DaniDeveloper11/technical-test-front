import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSubmitting: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage : string = ''


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

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
}
