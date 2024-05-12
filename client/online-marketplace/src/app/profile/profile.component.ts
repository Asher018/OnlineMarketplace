import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Item } from '../../../../../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  myItems: Item[] = [];
  user: User | null = null;

  constructor(private itemService: ItemService, private authService: AuthService) {
    this.getUser();
    this.getMyItems();
  }

  async init() {
    await this.getUser();
    if (this.user?.role === "seller") {
      await this.getMyItems();
    }
  }

  async getUser() {
    this.user = await this.authService.getCurrentUser();
  }

  async getMyItems() {
    this.myItems = await this.itemService.getMyItems() as Item[];
  }
}
