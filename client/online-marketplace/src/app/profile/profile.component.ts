import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Item } from '../../../../../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, MatCardModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  myItems: Item[] = [];
  myBoughtItems: Item[] = [];
  user: User | null = null;

  constructor(private itemService: ItemService, private authService: AuthService) {
    this.init();
  }

  async init() {
    await this.getUser();
    if (this.user?.role === "seller") {
      await this.getMyItems();
    }
    else if (this.user?.role === "buyer") {
      await this.getMyBoughtItems();
    }
  }

  async getUser() {
    this.user = await this.authService.getCurrentUser();
  }

  async getMyItems() {
    this.myItems = await this.itemService.getMyItems() as Item[];
  }

  async getMyBoughtItems() {
    this.myBoughtItems = await this.itemService.getMyBoughtItems() as Item[];
  }
}
