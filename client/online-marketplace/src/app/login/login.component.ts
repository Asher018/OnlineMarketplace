import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatProgressSpinnerModule, NavbarComponent, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.router.navigateByUrl('/marketplace');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
