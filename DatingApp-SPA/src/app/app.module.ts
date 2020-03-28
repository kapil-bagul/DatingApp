import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import {NgxGalleryModule} from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './member/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './member/member-list/member-card/member-card.component';
import { MemberDetailComponent } from './member/member-list/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './member/member-list/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './member/photo-editor/photo-editor.component';
import { ListResolver } from './_resolver/list.resolver';



export function tokenGetter(){
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      ButtonsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config:{
            tokenGetter: tokenGetter,
            blacklistedRoutes:['localhost:5000/api/auth'],
            whitelistedDomains:['localhost:5000']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListResolver,
      PreventUnsavedChanges,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
