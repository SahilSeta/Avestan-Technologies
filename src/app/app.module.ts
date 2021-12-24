import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { JwtService } from './services/jwt.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './admin/layouts/header/header.component';
import { SidebarComponent } from './admin/layouts/sidebar/sidebar.component';
import { ProfilesComponent } from './admin/profiles/profiles.component';
import { ViewProfileComponent } from './admin/view-profile/view-profile.component';
import { FooterComponent } from './admin/layouts/footer/footer.component';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileUpdateComponent } from './admin/profile-update/profile-update.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent, HeaderComponent, FooterComponent, SidebarComponent, ProfilesComponent, ViewProfileComponent, LoginComponent, ProfileUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AdminModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    JwtService,
    ProfileService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
