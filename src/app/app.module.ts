import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClerkHomeComponent } from './clerk/clerk-home/clerk-home.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ExtendReturnDateDialogComponent } from '../app/dialogs/extend-return-date-dialog/extend-return-date-dialog.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { DeleteDialogComponent } from './dialogs/user-clerk/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './dialogs/user-clerk/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './dialogs/user-clerk/add-dialog/add-dialog.component';
import { NavClerkMenuComponent } from './nav-clerk-menu/nav-clerk-menu.component';
import { ItemManagementDashboardComponent } from './clerk/item-management-dashboard/item-management-dashboard.component';
import { AddItemDialogComponent } from './dialogs/add-item-dialog/add-item-dialog.component';
import { EditItemDialogComponent } from './dialogs/edit-item-dialog/edit-item-dialog.component';
import { DeleteItemDialogComponent } from './dialogs/delete-item-dialog/delete-item-dialog.component';
import { BookingManagementDashboardComponent } from './clerk/booking-management-dashboard/booking-management-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ClerkHomeComponent,
    VehicleDetailComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    NavMenuComponent,

    MyBookingsComponent,
    ExtendReturnDateDialogComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    NavClerkMenuComponent,
    ItemManagementDashboardComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    DeleteItemDialogComponent,
    BookingManagementDashboardComponent
  ],
  entryComponents:[ExtendReturnDateDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LayoutModule,
    FlexLayoutModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
