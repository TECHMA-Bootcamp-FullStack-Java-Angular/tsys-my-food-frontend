import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/user';

export interface UserforAdmin {
  id: number;
  username: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  
  private url = environment.apiUrl + '/api/v1/users';
  private url2 = environment.apiUrl + '/api/v1/user';
  private http = inject(HttpClient)

  private usersApi: UserforAdmin[] = []

  private userSubject = new BehaviorSubject<UserforAdmin[]>(this.usersApi);
  
  getUsers(num1:number,num2:number): Observable<UserforAdmin[]> {
    return this.http.get<any[]>(this.url+"?page="+num1+"&size="+num2);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any[]>(this.url2+"/"+userId);

  }

  updateUser(userId: number,user: UserDTO): Observable<any> {
    let roleId:number=1;
    const newRole = prompt('Ingrese el nuevo rol (user, admin, chef):');
      if (newRole && ['USER', 'ADMIN', 'CHEF'].includes(newRole.toLocaleUpperCase())) {
        if(newRole.toLocaleUpperCase() == 'USER') {
          roleId =3;
        }
        else if(newRole.toLocaleUpperCase() == 'CHEF'){
          roleId=2;
        }
        else if(newRole.toLocaleUpperCase() == 'ADMIN'){
          roleId=1;
        }
        user.role.name=newRole.toLocaleUpperCase();
        user.role.id=roleId;
        return this.http.put(this.url2+"/"+userId,user, { headers: { 'Content-Type': 'application/json' } });
      } else {
        alert('Rol inválido. Se requiere "user", "admin" o "chef".');
        return of();
      }
  }

  getTotalUsersCount(): number {
    return this.usersApi.length;
  }

  constructor() { }
}
