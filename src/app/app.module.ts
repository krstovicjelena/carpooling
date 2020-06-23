import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from './matrial.module';
import { RoutingModule } from './routing.module';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule} from '@angular/forms'
import 'hammerjs';

import { UserService } from './auth/user.service';
import { SuccessComponent } from './auth/signup/success/success.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { NewRideComponent } from './rides/new-ride/new-ride.component';
import { RideService } from './rides/ride.service';
import { MatStepperModule } from  '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import { FailComponent } from './auth/signup/failure/fail/fail.component';
import { FailedLoginComponent }  from './auth/login/failure/failed-login/failed-login.component';
import { AllRidesComponent } from './rides/all-rides/all-rides.component';

import { Ng5SliderModule } from 'ng5-slider';
import {MatExpansionModule} from '@angular/material/expansion';
import { RequestRideComponent } from './rides/request-ride/request-ride.component';
import { EditRideComponent } from './rides/edit-ride/edit-ride.component';
import { Routes, RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RequestsComponent } from './notifications/requests/requests.component';
import { SentRequestsComponent } from './notifications/sent-requests/sent-requests.component';
import { RecievedRequestsComponent } from './notifications/recieved-requests/recieved-requests.component';
import { ApprovedComponent } from './notifications/approved/approved.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CompletedRidesComponent } from './notifications/completed-rides/completed-rides.component';
import { RateComponent } from './notifications/completed-rides/rate/rate.component';
import { TosComponent } from './auth/signup/tos/tos.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ConfirmProfileComponent } from './auth/signup/confirm-profile/confirm-profile.component';
import { RidesComponent } from './rides/rides.component';
import { NotificationService } from './notifications/notification.service';
import { CommentsDialogComponent } from './auth/profile/comments-dialog/comments-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    SuccessComponent,
    FailComponent,
    FailedLoginComponent,
    ProfileComponent,
    NewRideComponent,
    AllRidesComponent,
    RequestRideComponent,
    EditRideComponent,
    RequestsComponent,
    SentRequestsComponent,
    RecievedRequestsComponent,
    ApprovedComponent,
    CompletedRidesComponent,
    RateComponent,
    TosComponent,
    ConfirmProfileComponent,
    RidesComponent,
    CommentsDialogComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    Ng5SliderModule,
    RouterModule.forRoot([]),
    RecaptchaModule.forRoot(),
  ],
  providers: [ UserService, RideService, NotificationService, AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [SuccessComponent,
     FailComponent,
      FailedLoginComponent,
       RequestRideComponent,
        EditRideComponent,
         RateComponent,
          TosComponent,
           CommentsDialogComponent ]
})
export class AppModule {
}
