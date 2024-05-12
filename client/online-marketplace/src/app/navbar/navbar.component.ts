import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../shared/model/User';
import { AuthService } from '../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatProgressBarModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: User | null = null;
  loading: boolean = true;

  constructor(private authService: AuthService) {
    const user = authService.getUser();
    if (user) {
      this.user = user;
      console.log(user);
    } else {
      this.getCurrentUser();
    }
  }

  async getCurrentUser() {
    this.user = await this.authService.getCurrentUser();
    console.log(this.user);
  }

  async logout() {
    console.log('logout pressed');
    const message = await firstValueFrom(this.authService.logout());
    this.user = null;
    location.reload();
    console.log(message);
  }
}
