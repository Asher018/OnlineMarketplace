import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';
import { Item } from '../../../../../../../shared/models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-upload-item-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './upload-item-dialog.component.html',
  styleUrl: './upload-item-dialog.component.scss',
})
export class UploadItemDialogComponent {
  itemFormGroup: FormGroup;
  srcResult: any;
  selectedFile: any;

  constructor(
    public dialogRef: MatDialogRef<UploadItemDialogComponent>,
    private fb: FormBuilder,
    private itemService: ItemService
  ) {
    this.itemFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      file: [''],
    }); 
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  async uploadItem(): Promise<void> {
    if (this.itemFormGroup.invalid) {
      console.log('its invalid');
      this.dialogRef.close();
      return;
    }
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.dialogRef.close();
      return;
    }

    const url = await this.uploadImageToStorage(this.selectedFile);
    console.log(url);

    const item: Item = {
      name: this.itemFormGroup.get("name")?.value,
      price: this.itemFormGroup.get("price")?.value,
      description: this.itemFormGroup.get("description")?.value,
      owner: '',
      boughtBy: '',
      image: '',
      _id: ''
    }
    console.log(item)
    try {
      let uploadedItem = await this.itemService.uploadItem(item);
      console.log(uploadedItem);
      if (uploadedItem) {
        console.log(await firstValueFrom(uploadedItem))
      }
      
      this.dialogRef.close();
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }

  async uploadImageToStorage(image: File) {

  }
}
