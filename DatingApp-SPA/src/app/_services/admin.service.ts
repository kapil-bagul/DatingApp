import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getUsersWithRole(){
  return this.http.get(this.baseUrl + 'admin/userWithRoles');
}

updateUserRoles(user:User, roles:{}){
  return this.http.post(this.baseUrl + 'admin/editRole/' + user.userName, roles);
}

}
