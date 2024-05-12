import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UploadItemDialogComponent } from '../shared/components/upload-item-dialog/upload-item-dialog.component';
import { ItemService } from '../shared/services/item.service';
import { Item } from '../../../../../shared/models/item.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
})
export class MarketplaceComponent {
  items: Item[] = [];
  user: User | null = null;

  constructor(
    private dialog: MatDialog,
    private itemService: ItemService,
    private authService: AuthService
  ) {
    this.init();
  }

  async init() {
    this.user = this.authService.getUser();
    if (!this.user) {
      await this.authService.getCurrentUser();
    }
    await this.getItems();
  }

  uploadItemDialog(): void {
    this.dialog.open(UploadItemDialogComponent, {
      minWidth: '400px',
    });
  }

  async getItems() {
    this.items = await this.itemService.getItems();
    console.log(this.items);
  }
}
