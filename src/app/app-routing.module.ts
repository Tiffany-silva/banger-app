import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingManagementDashboardComponent } from './clerk/booking-management-dashboard/booking-management-dashboard.component';
import { ClerkHomeComponent } from './clerk/clerk-home/clerk-home.component';
import { HomeComponent } from './home/home.component';
import { ItemManagementDashboardComponent } from './clerk/item-management-dashboard/item-management-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import {RateComparisonsComponent} from './clerk/rate-comparisons/rate-comparisons.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent,},
  {path: 'home', component: HomeComponent},
  {path: 'nav', component: NavMenuComponent},
  {path: 'vehicle-detail/:id', component: VehicleDetailComponent,},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService],
    data: {
      role: 'hirer'
    }
  },
  {path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuardService]},
  {path:'my-bookings', component:MyBookingsComponent, canActivate: [AuthGuardService],
    data: {
      role: 'hirer'
    }
  },
  {path:'clerk-home', component:ClerkHomeComponent, canActivate: [AuthGuardService],
    data: {
      role: 'clerk'
    }
  },
  {path:'clerk-item-management', component:ItemManagementDashboardComponent, canActivate: [AuthGuardService],
    data: {
       role: 'clerk'
    }
  },
  {path:'clerk-booking-management', component:BookingManagementDashboardComponent, canActivate: [AuthGuardService],
    data: {
      role: 'clerk'
    }
  },
  {path:'clerk-rate-comparison', component:RateComparisonsComponent, canActivate: [AuthGuardService],
    data: {
      role: 'clerk'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
