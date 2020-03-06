import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  decodedToken:any;
  jwtHelper = new JwtHelperService();
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user : User = JSON.parse(localStorage.getItem('user')) ;
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);

    if(user){
      this.authService.currentUser = user;
    }
    }
  }
  constructor(private authService : AuthService){}
  title = 'DatingApp-SPA';
}
