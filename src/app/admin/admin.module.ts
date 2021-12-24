import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component : DashboardComponent },
      { path: 'profiles', component : ProfilesComponent },
      { path: 'view/profile', component : ViewProfileComponent },
      { path: 'profiles/edit/:id', component : ProfileUpdateComponent }
    ]),

  ],
  exports : [RouterModule]
})
export class AdminModule { }
