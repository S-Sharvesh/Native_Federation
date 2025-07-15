import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel } from './model';
import { Observable, map } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getAddressModel(): Observable<AddressModel[]> {
    const namesToExclude = [
      'Leanne Graham',
      'Ervin Howell',
      'Clementine Bauch',
      'Patricia Lebsack',
      'Chelsey Dietrich',
    ];

    return this.http
      .get<AddressModel[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((addr) =>
          addr.filter((user) => !namesToExclude.includes(user.name))
        )
      );
  }
}
