import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Users } from './Users';
import { map } from 'rxjs/operators';
import { Settings } from './settings';
import { Notifications } from './notifications';
import { Container } from './container';
import { Shipsgocontainer } from './shipsgocontainer';
import { compileNgModule } from '@angular/core/src/render3/jit/module';
//import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
httpOptions.headers.append('Access-Control-Allow-Headers', 'Content-Type');
httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
httpOptions.headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})


export class UsersService {
  url = "https://localhost:44375/api/AccountAPI";
  //  url = "https://api.containertracking.dk/api/AccountAPI";
  emailUrl = "https://api.containertracking.dk/api/Email";

  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.get<any>(this.url + '/checkLoginDetails?username=' + username + '&password=' + password, httpOptions);
  }
  getdetails(userid: string) {
    return this.http.get<any>(this.url + '/getUserDetails?id=' + userid, httpOptions);
  }
  getUserlogDetails() {
    return this.http.get<any>(this.url + '/getuserlogDetails', httpOptions);
  }
  getallUserDetails() {
    return this.http.get<any>(this.url + '/getalluserDetails', httpOptions);
  }
  getCompanyDetailsByName(company_name) {
    return this.http.get<any>(this.url + '/getCompanyDetailsByName?company_name=' + company_name, httpOptions);
  }
  getCompanydetails(userid: string) {
    return this.http.get<any>(this.url + '/getCompanyDetails?id=' + userid, httpOptions);
  }
  getShippingLine() {
    return this.http.get<any>(this.url + '/GetShippingLineList', httpOptions);
  }
  GetContainerTrackingdetails(userid: string) {
    return this.http.get<any>(this.url + '/GetContainerTrackingalldetails?user_id=' + userid, httpOptions);
  }
  insertUsers(user: Users) {
    return this.http.post<any>(this.url + '/InsertUserDetails', user, httpOptions);
  }
  insertShipgocontainer(shipsgo: Shipsgocontainer) {
    return this.http.post<any>(this.url + '/insertShipgocontainer', shipsgo, httpOptions);
  }
  updateUsers(user: Users) {
    return this.http.post<any>(this.url + '/updateUserDetails', user, httpOptions);
  }
  updateUserlog(email: string) {
    return this.http.post<any>(this.url + '/updateUserlog?email=' + email, httpOptions);
  }
  updateUserStatus(userid: string, status: string) {
    return this.http.post<any>(this.url + '/updateUserStatus?userid=' + userid + '&status=' + status, httpOptions);
  }
  deleteContainer(userid, containerno) {
    return this.http.post<any>(this.url + '/deleteContainer?userid=' + userid + '&containerno=' + containerno, httpOptions);
  }
  deleteUser(userid: string) {
    return this.http.post<any>(this.url + '/deleteUser?userid=' + userid, httpOptions);
  }
  updateSettings(settings: Settings) {
    return this.http.post<any>(this.url + '/updateSettingsdetails/', settings, httpOptions);
  }
  sendEmail(email: String) {
    return this.http.get<any>(this.emailUrl + '/sendEmail?clientmessage=' + email, httpOptions);
  }
  updateNotifications(notifications: Notifications) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + '/updateNotificationsdetails/', notifications, httpOptions);
  }
  getSettingsDetails(userid: string) {
    return this.http.get<any>(this.url + '/getSettingsDetails?userid=' + userid, httpOptions);
  }
  getallShippingLines() {
    return this.http.get<any>(this.url + '/getallShippingLines', httpOptions);
  }
  getShipmentDetails(userid: string) {
    return this.http.get<any>(this.url + '/getShipmentDetails?id=' + userid, httpOptions);
  }
  getNotificationsDetails(userid: string) {
    return this.http.get<any>(this.url + '/getNotificationsDetails?userid=' + userid, httpOptions);
  }

  updateShipmentReference(po_number: string, container_no: string, container_type: string, shipping_line: string, user_id: string) {
    return this.http.post<any>(this.url + '/UpdateReference?container_no=' + container_no + '&po_no=' + po_number + '&container_type=' + container_type + '&shipping_line=' + shipping_line + '&user_id=' + user_id, httpOptions);

  }
  UpdatecontainerDates(container_no: string, userid: string, departure: string, arrival: string, firstarrival: string) {

    return this.http.post<any>(this.url + '/UpdatecontainerDates?container_no=' + container_no + '&userid=' + userid + '&departure=' + departure + '&arrival=' + arrival + '&firstarrival=' + firstarrival, httpOptions);

  }
  updateUserList(container_no: string, name: string, po_no: string, user_id: string) {
    return this.http.post<any>(this.url + '/UpdateUserList?container_no=' + container_no + '&name=' + name + '&po_no=' + po_no + '&user_id=' + user_id, httpOptions);

  }
  SendBookDemo(emailto: string, f_name: string, l_name: string, phone_number: string, website: string, cmp_name: string) {
    return this.http.get<any>(this.emailUrl + '/SendBookingDemoEmail?emailto=' + emailto + '&f_name=' + f_name + '&l_name=' + l_name + '&phone_number=' + phone_number + '&website=' + website + '&cmp_name=' + cmp_name, httpOptions);
  }
  sendnewUserAddedEmail(emailto: string, cmp_name: string) {
    return this.http.get<any>(this.emailUrl + '/sendnewUserAddedEmail?emailto=' + emailto + '&company_name=' + cmp_name, httpOptions);
  }

  updateCompanyDetails(f_name: string, l_name: string, c_name: string, user_id: string) {
    return this.http.post<any>(this.url + '/updateCompanyDetails?userid=' + user_id + '&firstname=' + f_name + '&lastname=' + l_name + '&companyname=' + c_name, httpOptions);

  }
  updateCompanyAlias(name: string, createdBy: string, userid: string) {
    return this.http.post<any>(this.url + '/updateCompanyAlias?name=' + name + '&createdBy=' + createdBy + '&userid=' + userid, httpOptions);
  }
  deleteCompanyAliasDetails(userid: string, createdBy: string) {
    return this.http.post<any>(this.url + '/deleteCompanyAliasDetails?userid=' + userid + '&createdBy=' + createdBy, httpOptions);
  }
}
