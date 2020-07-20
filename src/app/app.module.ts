import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HeaderSectionComponent } from './header_section/headersection.component';
import { FooterSectionComponent } from './footer_section/footersection.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { InnerHeaderSectionComponent } from './inner_header_section/innerheadersection.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchingPipe } from './searching.pipe';
import { SortingPipe } from './sorting.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required BrowserAnimationsModule
import { RegisterComponent } from './register/register.component';
import { LoglistComponent } from './loglist/loglist.component';
import { OrderModule } from 'ngx-order-pipe';
import {DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { NgxLoadingModule } from 'ngx-loading';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
 
  
} from '@angular/material';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { Admin_HeaderComponent } from './admin_header/admin_header.component';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material';
import { UserlistComponent } from './userlist/userlist.component';
import { ContainerlistComponent } from './containerlist/containerlist.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SpinnerProgressComponent } from './spinner-progress/spinner-progress.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderSectionComponent,
    FooterSectionComponent,
    ShipmentComponent,
    InnerHeaderSectionComponent,
    ProfileComponent,
    SettingsComponent,
    ContactusComponent,
    SearchingPipe,
    SortingPipe,
    RegisterComponent,
    LoglistComponent,
    Admin_HeaderComponent,
    UserlistComponent,
    ConfirmationDialogComponent,
    ContainerlistComponent,
    AboutusComponent,
    SpinnerProgressComponent,
    //MatPaginator,
    //MatDatepickerModule, MatNativeDateModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule,
    //MatInputModule, 
   // MatTableModule,
    //UsersService
  ],
  imports: [
    DragDropModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    OrderModule,
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule, // <-- include angular2-collapsible module
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    NgxLoadingModule.forRoot({}),
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCEGG2CPf0i22Gh5paHzN-A7qTNK3_IOEs'}),
    GooglePlaceModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'Shipment', component: ShipmentComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'Settings', component: SettingsComponent },
      { path: 'contact', component: ContactusComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'loglist', component: LoglistComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'containerlist', component: ContainerlistComponent }
    ]),
    NgbModule.forRoot()
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [DatePipe],
  //providers: [HttpClientModule, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
