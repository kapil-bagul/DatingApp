import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/User';


@Component({
  selector: 'app-roles-model',
  templateUrl: './roles-model.component.html',
  styleUrls: ['./roles-model.component.css']
})
export class RolesModelComponent implements OnInit {
  @Output() updateSelectedRole = new EventEmitter();
  user: User;
  roles:any[];
 
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

  updateRoles(){
    this.updateSelectedRole.emit(this.roles);
    this.bsModalRef.hide();
  }

}
