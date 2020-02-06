import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  @Output() cancelRegister = new EventEmitter();
  model:any={};
  constructor( private authService : AuthService  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.authService.register(this.model).subscribe( ()=>{
        console.log('register done');
    },(error)=>{
      console.log('Error while registration process');
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled..');
  }

}
