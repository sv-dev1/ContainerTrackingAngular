import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Settings } from '../settings';
import { Notifications } from '../notifications';
import { Notification } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',

})
export class SettingsComponent implements OnInit {
  profileForm: any;
  Settings: any;
  nrSelect1: any;
  nrSelect2: any;
  nrSelect3: any;
  nrSelect4: any;
  nrSelect5: any;
  nrSelect6: any;
  nrSelect7: any;
  nrSelect8: any;
  nrSelect9: any;
  nrSelect10: any;
  nrSelect11:any;
  nrSelect12:any;
  notifcations: any;
  chkShipmentref: boolean;
  chkorigin: boolean;
  chkcontainer_type: boolean;
  chkdestination: boolean;
  chkocontainer_no: boolean;
  chkdeparture: boolean;
  chkarrival: boolean;
  chkfirst_arrival: boolean;
  chkshipping_line: boolean;
  chkstatus: boolean;
  chkearly_delay: boolean;
  chkfrom_country: boolean;
  chkto_country: boolean;
  chktransit_time: boolean;
  chkfirst_eta: boolean;
  chkbl_reference_no: boolean;
  chktransit_ports: boolean;
  chkgetout_date: boolean;
  chkempty_return_date: boolean;
  chkshipment_by: boolean;
  chkdays_beforeArrival: boolean;
  chk_vesselName: boolean;
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router) { this.Settings = new Settings(); this.notifcations = new Notifications(); }

  ngOnInit() {
    debugger;
    document.getElementById("linkSettings").removeAttribute("class");
    document.getElementById("linkSettings").setAttribute("class", "list-inline-item active");
    this.profileForm = this.formbulider.group({
      exampleCheck1: ['', [Validators.required]],
      exampleCheck2: ['', [Validators.required]],
      exampleCheck3: ['', [Validators.required]],
      exampleCheck4: ['', [Validators.required]],
      exampleCheck5: ['', [Validators.required]],
      exampleCheck6: ['', [Validators.required]],
      exampleCheck7: ['', [Validators.required]],
      exampleCheck8: ['', [Validators.required]],
      exampleCheck9: ['', [Validators.required]],
      exampleCheck10: ['', [Validators.required]],
      exampleCheck11: ['', [Validators.required]],
      // exampleCheck12: ['', [Validators.required]],
      exampleCheck12: [null],
      // exampleCheck13: ['', [Validators.required]],
      exampleCheck13: [null],
      exampleCheck14: ['', [Validators.required]],
      // exampleCheck15: ['', [Validators.required]],
      exampleCheck15: [null],
      exampleCheck16: ['', [Validators.required]],
      // exampleCheck17: ['', [Validators.required]],
      exampleCheck17: [null],
      exampleCheck18: ['', [Validators.required]],
      // exampleCheck19: ['', [Validators.required]],
      exampleCheck19: [null],
      // exampleCheck20: ['', [Validators.required]],
      exampleCheck20: [null],
      exampleCheck22: ['', [Validators.required]],
      con_add_emails: ['', [Validators.required]],
      dep_change_emails: ['', [Validators.required]],
      arr_change_emails: ['', [Validators.required]],
      con_del_emails: ['', [Validators.required]],
      time_out_emails: ['', [Validators.required]],
      until_arrival_emails: ['', [Validators.required]],
    });
  this.setSettingsDetails();
  }
  onFormSubmit() {
    debugger;
    var data = localStorage.getItem("user_id");
    if (data != null || data != "") {
      this.Settings.userid = data;
      this.Settings.shipment_ref = this.chkShipmentref == true ? 1 : 0;
      this.Settings.origin = this.chkorigin == true ? 1 : 0;
      this.Settings.container_type = this.chkcontainer_type == true ? 1 : 0;
      this.Settings.destination = this.chkdestination == true ? 1 : 0;
      this.Settings.container_no = this.chkocontainer_no == true ? 1 : 0;
      this.Settings.departure = this.chkdeparture == true ? 1 : 0;
      this.Settings.arrival = this.chkarrival == true ? 1 : 0;
      this.Settings.first_arrival = this.chkfirst_arrival == true ? 1 : 0;
      this.Settings.shipping_line = this.chkshipping_line == true ? 1 : 0;
      this.Settings.status = this.chkstatus == true ? 1 : 0;
      this.Settings.early_delay = this.chkearly_delay == true ? 1 : 0;
      // this.Settings.from_country = this.chkfrom_country == true ? 1 : 0;
      this.Settings.from_country = 1;
      // this.Settings.to_country = this.chkto_country == true ? 1 : 0;
      this.Settings.to_country = 1;
      this.Settings.transit_time = this.chktransit_time == true ? 1 : 0;
      // this.Settings.first_eta = this.chkfirst_eta == true ? 1 : 0;
      this.Settings.first_eta = 1;
      this.Settings.bl_reference_no = this.chkbl_reference_no == true ? 1 : 0;
      this.Settings.transit_ports = this.chktransit_time == true ? 1 : 0;
      this.Settings.getout_date = this.chkgetout_date == true ? 1 : 0;
      // this.Settings.empty_return_date = this.chkempty_return_date == true ? 1 : 0;
      this.Settings.empty_return_date = 1;
      // this.Settings.shipment_by = this.chkshipment_by == true ? 1 : 0;
      this.Settings.shipment_by = 1;
      this.Settings.days_before_arrival = this.chkdays_beforeArrival == true ? 1 : 0;
      this.Settings.vessel_name = this.chk_vesselName == true ? 1 : 0;
      this.UpdateSettings(this.Settings);
      this.notifcations.user_id = data;
      this.notifcations.ConAddSts = Number(this.nrSelect1);
      this.notifcations.ConAddTime = Number(this.nrSelect2);
      this.notifcations.DepChangeSts = Number(this.nrSelect3);
      this.notifcations.DepChangeTime = Number(this.nrSelect4);
      this.notifcations.ArrChangeSts = Number(this.nrSelect5);
      this.notifcations.ArrChangeTime = Number(this.nrSelect6);
      this.notifcations.ConDelSts = Number(this.nrSelect7);
      this.notifcations.ConDelTime = Number(this.nrSelect8);
      this.notifcations.ConTimeoutSts = Number(this.nrSelect9);
      this.notifcations.ConTimeoutTime = Number(this.nrSelect10);

      this.notifcations.ConUntilarrivalByEmail = Number(this.nrSelect12);
      
      this.notifcations.ConUntilarrivalDays = Number(this.nrSelect11);
      this.notifcations.con_add_emails = ((document.getElementById("txtconaddemail") as HTMLInputElement).value);
      this.notifcations.dep_change_emails = ((document.getElementById("txtdepchangeemail") as HTMLInputElement).value);
      this.notifcations.arr_change_emails = ((document.getElementById("txtarrchangeemail") as HTMLInputElement).value);
      this.notifcations.con_del_emails = ((document.getElementById("txtcondelemail") as HTMLInputElement).value);
      this.notifcations.con_timeout_emails = ((document.getElementById("txttimeoutemail") as HTMLInputElement).value);
      this.notifcations.con_unit_emails = ((document.getElementById("txtuntilarrivalemail") as HTMLInputElement).value);

      this.updateNotifications(this.notifcations);

    }
  }
  selectChangeHandler1(event: any) {
    //update the ui
    this.nrSelect1 = event.target.value;
  }
  selectChangeHandler2(event: any) {
    //update the ui
    this.nrSelect2 = event.target.value;
  }
  selectChangeHandler3(event: any) {
    //update the ui
    this.nrSelect3 = event.target.value;
  }
  selectChangeHandler4(event: any) {
    //update the ui
    this.nrSelect4 = event.target.value;
  }
  selectChangeHandler5(event: any) {
    //update the ui
    this.nrSelect5 = event.target.value;
  }
  selectChangeHandler6(event: any) {
    //update the ui
    this.nrSelect6 = event.target.value;
  }
  selectChangeHandler7(event: any) {
    //update the ui
    this.nrSelect7 = event.target.value;
  }
  selectChangeHandler8(event: any) {
    //update the ui
    this.nrSelect8 = event.target.value;
  }
  selectChangeHandler9(event: any) {
    //update the ui
    this.nrSelect9 = event.target.value;
  }
  selectChangeHandler10(event: any) {
    //update the ui
    this.nrSelect10 = event.target.value;
  }
  selectChangeHandler11(event: any) {
    //update the ui
    this.nrSelect11 = event.target.value;
  }
  selectChangeHandler12(event: any) {
    //update the ui
    this.nrSelect12 = event.target.value;
  }
  showNotification(from, align) {
    //const type = ['', 'info', 'success', 'warning', 'danger'];
    const type = [ 'success'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>Updations done successfully</b>"

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert alert_notify alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="mdi mdi-close"></i></button>' +
          '<span class="notify-icon"><i class="mdi mdi-bell-outline" data-notify="icon"></i> </span>' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  UpdateSettings(Settings: Settings) {
      this.usersService.updateSettings(Settings).subscribe();
  }
  updateNotifications(notifications: Notifications) {
    this.usersService.updateNotifications(notifications).subscribe(res => { if (res == "1") this.showNotification('top', 'center'); })
  }
  setSettingsDetails() {
    var data = localStorage.getItem("user_id");
    if (data != null || data != "") {
      this.usersService.getSettingsDetails(data).subscribe(res => {
        this.Settings = res;
        this.chkShipmentref = this.Settings.shipment_ref == 1 ? true : false;
        this.chkorigin = this.Settings.origin == 1 ? true : false;
        this.chkcontainer_type = this.Settings.container_type == 1 ? true : false;
        this.chkdestination = this.Settings.destination == 1 ? true : false;
        this.chkocontainer_no = this.Settings.container_no == 1 ? true : false;
        this.chkdeparture = this.Settings.departure == 1 ? true : false;
        this.chkarrival = this.Settings.arrival == 1 ? true : false;
        this.chkfirst_arrival = this.Settings.first_arrival == 1 ? true : false;
        this.chkshipping_line = this.Settings.shipping_line == 1 ? true : false;
        this.chkstatus = this.Settings.status == 1 ? true : false;
        this.chkearly_delay= this.Settings.early_delay == 1 ? true : false;
        // this.chkfrom_country = this.Settings.from_country == 1 ? true : false;
        this.chkfrom_country = true;
        // this.chkto_country = this.Settings.to_country == 1 ? true : false;
        this.chkto_country = true;
        this.chktransit_time = this.Settings.transit_time == 1 ? true : false;
        // this.chkfirst_eta = this.Settings.first_eta == 1 ? true : false;
        this.chkfirst_eta = true;
        this.chkbl_reference_no = this.Settings.bl_reference_no == 1 ? true : false;
        // this.chktransit_ports = this.Settings.transit_ports == 1 ? true : false;
        this.chktransit_ports = true;
        this.chkgetout_date = this.Settings.getout_date == 1 ? true : false;
        // this.chkempty_return_date = this.Settings.empty_return_date == 1 ? true : false;
        this.chkempty_return_date = true;
        // this.chkshipment_by = this.Settings.shipment_by == 1 ? true : false;
        this.chkshipment_by = true;
        this.chkdays_beforeArrival = this.Settings.days_before_arrival == 1 ? true : false;
        this.chk_vesselName = this.Settings.vessel_name == 1 ? true : false;
      });
      this.usersService.getNotificationsDetails(data).subscribe(res => {
        this.notifcations = res;
        this.nrSelect1 = this.notifcations.ConAddSts;
        this.nrSelect2 = this.notifcations.ConAddTime;
        this.nrSelect3 = this.notifcations.DepChangeSts;
        this.nrSelect4 = this.notifcations.DepChangeTime;
        this.nrSelect5 = this.notifcations.ArrChangeSts;
        this.nrSelect6 = this.notifcations.ArrChangeTime;
        this.nrSelect7 = this.notifcations.ConDelSts;
        this.nrSelect8 = this.notifcations.ConDelTime;
        this.nrSelect9 = this.notifcations.ConTimeoutSts;
        this.nrSelect10 = this.notifcations.ConTimeoutTime;
        this.nrSelect11 = this.notifcations.ConUntilarrivalDays;
        this.nrSelect12 = this.notifcations.ConUntilarrivalByEmail;
        this.profileForm.controls['con_add_emails'].setValue(this.notifcations.con_add_emails);
        this.profileForm.controls['dep_change_emails'].setValue(this.notifcations.dep_change_emails);
        this.profileForm.controls['arr_change_emails'].setValue(this.notifcations.arr_change_emails);
        this.profileForm.controls['con_del_emails'].setValue(this.notifcations.con_del_emails);
        this.profileForm.controls['time_out_emails'].setValue(this.notifcations.con_timeout_emails);
        this.profileForm.controls['until_arrival_emails'].setValue(this.notifcations.con_unit_emails);
      });
    }
    }
}
