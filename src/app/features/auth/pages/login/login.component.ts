import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

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


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      // this.isSubmitting = false;
      // if (success) {
      //   this.router.navigate(['/home']); // Redirigir a Home después del login exitoso
      // } else {
      //   this.errorMessage = 'Credenciales incorrectas';
      // }
      next: () => {
        this.router.navigate(['/home']); // Redirige después del login
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        this.isSubmitting = false;
      }
    });
  }
}
