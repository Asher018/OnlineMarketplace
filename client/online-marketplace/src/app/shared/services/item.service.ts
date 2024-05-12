import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../../../../../shared/models/item.model';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  async uploadItem(item: Item) {
    const user = await this.authService.getCurrentUser();
    console.log(user);
    if (!user) {
      return null;
    }

    const body = new URLSearchParams();
    body.set('name', item.name);
    body.set('price', item.price.toString());
    body.set('description', item.description || '');
    body.set('owner', user._id);
    body.set('boughtBy', '');
    body.set('image', item.image || '');

    return this.http.post('http://localhost:5000/app/itemUpload', body, {
      withCredentials: true,
      headers: this.headers,
    });
  }

  async getItems() {
    return await firstValueFrom(
      this.http.get('http://localhost:5000/app/getItems', {
        withCredentials: true,
        headers: this.headers,
      })
    ) as Item[];
  }


}