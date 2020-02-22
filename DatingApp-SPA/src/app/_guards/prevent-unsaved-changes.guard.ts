import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member/member-list/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent){
        
        if(component.editFormTemplate.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }

}


