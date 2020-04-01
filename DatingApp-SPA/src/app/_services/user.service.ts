import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { TypeaheadOptions } from 'ngx-bootstrap';
import { Message } from '../_models/Message';



@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl =  environment.apiUrl;


constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParam?, likesParam?): Observable<PaginatedResult<User[]>>{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if( page != null && itemsPerPage != null)
  {
    params =  params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if(userParam != null)
  {
    params =  params.append('minAge', userParam.minAge);
    params =  params.append('maxAge', userParam.maxAge);
    params =  params.append('gender', userParam.gender);
    params =  params.append('orderBy', userParam.orderBy);
  }

  if(likesParam === 'Likers')
  {
    params = params.append('likers', 'true');
  }

  if(likesParam === 'Likees')
  {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users',{ observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null ){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')) ;
           
        }
        return paginatedResult;
      })
    );
}

getUser(id):Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id,user);
}

setMainPhoto(userId : number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' +  id + '/setMain', {}); 
}


deletePhoto(userId : number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' +  id); 
}

sendLikes(id: number, recipientId: number){
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?){
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  if( page != null && itemsPerPage != null)
  {
    params =  params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  params = params.append('MessageContainer', messageContainer);

  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/',{ observe: 'response', params})
    .pipe(
      map(response =>{
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') != null ){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')) ;
          }

          return paginatedResult;
      })
    );

}





}


