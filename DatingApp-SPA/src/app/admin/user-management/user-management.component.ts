import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModelComponent } from '../roles-model/roles-model.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:User[];
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private alertify: AlertifyService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){

    this.adminService.getUsersWithRole().subscribe((users: User[])=>{
      this.users = users;
      console.log(this.users);
    },error => {
      console.log('Error while getting user roles');
      this.alertify.error(error);
    });

  }

  editRolesModal(user: User){
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModelComponent, {initialState});
    this.bsModalRef.content.updateSelectedRole.subscribe((values)=>{
        const rolesToUpdate = {
          roleName: [...values.filter(el => el.checked === true).map(el => el.name)]
        };

        //console.log(rolesToUpdate);
        if(rolesToUpdate){
          this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(()=>{
            user.roles = [...rolesToUpdate.roleName];
          },error =>{
            console.log(error);
            //this.alertify.error(error);
          });
        }
    });
  }

  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name:'Admin', value:'Admin'},
      {name:'Member', value:'Member'},
      {name:'Moderator', value:'Moderator'},
      {name:'VIP', value:'VIP'}
    ];

    for(let i=0; i< availableRoles.length;i++){
      let isMatch = false;
      for(let j=0; j< userRoles.length;j++){
        if(availableRoles[i].name === userRoles[j]){
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if(!isMatch){
        availableRoles[i].checked=false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }
  

}
