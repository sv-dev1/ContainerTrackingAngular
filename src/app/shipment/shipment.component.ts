import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Container } from '../container';
import { container } from '@angular/core/src/render3';
import { Shipsgocontainer } from '../shipsgocontainer';
import { Settings } from '../settings';
import { CodeNode } from 'source-list-map';
import { ExcelServicesService } from '../services/excel-services.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { concat } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-shipment.component',
  templateUrl: './shipment.component.html',

})
export class ShipmentComponent {

  last_Lat: number = 0;
  last_Lng: number = 0;
  lat: number = 51.673858;
  lng: number = 7.815982;
  mapType: any;
  zoom: number = 3;

  color: any = "Red";
  public latitude: number;
  public longitude: number;
  public maxSpeed: number;

  public polyline: Array<any>;
  public polylines: Array<any>;
  selectedData: Boolean;
  data: any;
  selected: string = "0";
  selecShippingLine: string = "";
  selecShippingLine1: string = "";
  selectedUser: string = "";
  selected1: number = 50;
  selecttNew: number = 10;
  record: Boolean;
  Shipmentref: string;
  chkShipmentref: boolean;
  Settings: any;
  editcompany_name: any;
  firstarrivaltime: any;
  public po_model_number: any;
  public container_model_number: any;
  public loading = false;
  company_name: any;
  po_no: any;
  user_id: any;
  shipuser_id: any;
  deprture: any;
  first_arrival: any;
  final_arrival: any;
  valConst: any = 0;
  val1: any = 0;
  val2: any = 0;
  val3: any = 0;
  val4: any = 0;
  val5: any = 0;
  val6: any = 0;
  vale: any;
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe, private excelService: ExcelServicesService, public dialog: MatDialog,private spinnerService: Ng4LoadingSpinnerService) {
    this.Settings = new Settings();
    this.container = new Container(); this.user = new Users();
    this.Shipsgo_container = new Shipsgocontainer();

  }

  //Shipmentref = "";
  p: number = 1;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  container: any;
  elements: any;
  user: any;

  id: any;
  checkVal: any = 1;
  userName: any;
  dropdownElements: any;
  dUserElements: any;
  dropShippingLine: any;
  Shipsgo_container: any;
  dta: any;
  shipment_ref: any;
  origin: any;
  destination: any;
  containertype: any;
  contypebool: any;
  containernumber: any;
  departure: any;
  arrival: any;
  firstarrival: any;
  shipingline: any;
  vesselname: any;
  earlydelay: any;
  arrivaltime: any;
  transittime: any;
  daysbeforearrival: any;
  config: any;
  colCount: number = 1;
  contaienrNo: any;
  usersList: any;
  selectType: string = "";
  userShipList: any = [];
  sts: number = 0;
  allShippingLines: any;

  container_type : any;
  container_no : any;
  shipping_line : any;
  status: any;
  early_delay : any;
  from_country : any;
  to_country : any;
  transit_time : any;
  first_eta : any;
  bl_reference_no : any;
  transit_ports : any;
  getout_date: any;
  empty_return_date : any;
  shipment_by : any;
  days_before_arrival: any;
  vessel_name : any;


  public paths = [
    { lat: 25.774, lng: -80.190 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 }
  ];
  headElements = ['id', 'Shipment Ref.', 'Origin', 'Con Type', 'Destination', 'Con No.', 'Departure', 'Arrival', 'Fin Arr', 'Shipping', 'Status', 'Early..', 'Action'];
  elements2: any = [
    { subject: 'Update Sales Strategy Documents', startdate: 'Origin', duedate: 'Origin', priority: 'high', completed: 'good' },
    { subject: 'Rollout of New Website and Marketing Brochures', startdate: 'Origin', duedate: 'Origin', priority: 'high', completed: 'good' }
  ]
  headelements2 = ['Subject', 'StartDate', 'DueDate', 'Priority', 'Completion']
  ngOnInit() {
    this.spinnerService.show();
    
    document.getElementById("linkShipment").removeAttribute("class");
    document.getElementById("linkShipment").setAttribute("class", "list-inline-item active");
    var data = localStorage.getItem("user_id");
    if (data != null || data != "") {

      this.usersService.getSettingsDetails(data).subscribe(res => {
        console.log("-----------");
        console.log(res);
        this.Settings = res;
        //setTimeout(()=>this.spinnerService.hide(),3000)
        //this.spinnerService.hide();
        console.log("-----------" + this.Settings.origin );
        this.shipment_ref = this.Settings.shipment_ref;
        if (this.shipment_ref == 1)
        this.colCount = this.colCount + 1;
        this.origin = this.Settings.origin;
        if (this.origin == 1)
        {this.colCount = this.colCount + 1;}
        
        console.log("-----------" + this.origin);
        
        this.container_type= this.Settings.container_type;
        this.container_no= this.Settings.container_no;
        this.shipping_line= this.Settings.shipping_line;
        this.status= this.Settings.status;
        this.early_delay= this.Settings.early_delay;
        this.from_country= this.Settings.from_country;
        this.to_country= this.Settings.to_country;
        this.transit_time= this.Settings.transit_time;
        this.first_eta= this.Settings.first_eta;
        this.bl_reference_no= this.Settings.bl_reference_no;
        this.transit_ports= this.Settings.transit_ports;
        this.getout_date= this.Settings.getout_date;
        this.empty_return_date= this.Settings.empty_return_date;
        this.shipment_by= this.Settings.shipment_by;
        this.days_before_arrival= this.Settings.days_before_arrival;
        this.vessel_name= this.Settings.vessel_name;

        this.destination = this.Settings.destination;
        if (this.destination == 1)
        this.colCount = this.colCount + 1;
        this.containernumber = this.Settings.ContainerNo;
        if (this.containernumber == 1)
        this.colCount = this.colCount + 1;
        this.departure = this.Settings.departure;
        if (this.departure == 1)
        this.colCount = this.colCount + 1;
        this.arrival = this.Settings.arrival;
        if (this.arrival == 1)
        this.colCount = this.colCount + 1;
        this.firstarrival = this.Settings.first_arrival;
        if (this.firstarrival == 1)
        this.colCount = this.colCount + 1;
        this.shipingline = this.Settings.ShippingLine;
        if (this.shipingline == 1)
        this.colCount = this.colCount + 1;
        // if (this.vesselname == 1)
        // this.colCount = this.colCount + 1;
        this.earlydelay = this.Settings.EarlyDelay;
        if (this.earlydelay == 1)
        this.colCount = this.colCount + 1;
        this.daysbeforearrival = this.Settings.DaysBeforeArrival;
        if (this.daysbeforearrival == 1)
        this.colCount = this.colCount + 1;
        this.contypebool = this.Settings.ContainerType;
        this.transittime = this.Settings.transit_time;
        this.vesselname = this.Settings.Vesselname;
        });
        
      this.usersService.GetContainerTrackingdetails(data).subscribe(res => {
        this.elements = res;
        this.spinnerService.hide();
        this.selectedData = this.elements;
        console.log(this.selectedData);
        for (let i = 0; i < this.elements.length; i++) {
          this.arrivaltime = this.elements[i].arrival;
          this.firstarrivaltime = this.elements[i].first_arrival;

        }

      });
      this.usersService.getdetails(data)
        .subscribe(res => {
          var obj = res;
          this.userName = obj["f_name"] + " " + obj["l_name"];
        });
      this.usersService.getCompanydetails(data).subscribe(res => {
        console.log(res);
        this.dropdownElements = res;
      });
      this.updateUserCheckboxList();
      //this.usersService.getShippingLine().subscribe(res => { this.dropShippingLine = JSON.parse(res); });

      //this.usersService.GetContainerTrackingdetails(data).subscribe(res => { this.dta = JSON.parse(res); });
      this.usersService.getallShippingLines().subscribe(res => { this.allShippingLines = res; });

    }
    else {

      this.router.navigate(['/']);
    }
    this.config = {
      itemsPerPage: 50,
      currentPage: 1
    };
  }
  checkfinalArrivalDate(arrival) {
    var CurrentDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
    var FinalArriavl = new Date(arrival);
    var TodayDate = new Date(CurrentDate);

    var date11 = new Date(CurrentDate).getTime();
    var date12 = new Date(arrival).getTime();
    var diff = date12 - date11;
    var days = Math.round(Math.abs(diff / (1000 * 60 * 60 * 24)));

    if (diff !== undefined) {
      if (!isNaN(diff)) {
        if (FinalArriavl > TodayDate) {
          return Number(days);
        }
        else {
          return 0;
        }


      }
      else {
        return 0;
      }
    }
  }
  updateList(companyname, containerno, po_no, userid) {
    this.po_no = po_no;
    this.contaienrNo = containerno;
    var data = localStorage.getItem("user_id");
    this.user_id = userid;
    this.usersService.getCompanydetails(data).subscribe(res => {
      this.dUserElements = res;
      this.company_name = companyname;
      const index1: number = this.dUserElements.indexOf("All Containers");
      if (index1 !== -1) {
        this.dUserElements.splice(index1, 1);
      }
      const index: number = this.dUserElements.indexOf(this.company_name);
      if (index !== -1) {
        this.dUserElements.splice(index, 1);
      }
      if (this.dUserElements.length == 1) {
        for (let i = 0; i < this.dUserElements.length; i++) {
          this.selectedUser = this.dUserElements[i];
        }
      }
    });

  }
  updateUserCheckboxList() {
    var data = localStorage.getItem("user_id");
    this.usersService.getCompanydetails(data).subscribe(res => {
      this.usersList = res;
      console.log(res);
      const index1: number = this.usersList.indexOf(0);
      for (var i = 0; i < this.usersList.length; i++) {
        if (this.usersList[i].userid === 0) {
          this.usersList.splice(i, 1);
        }
      }
      //if (index1 !== -1) {
      //  this.usersList.splice(index1, 1);
      //}
    });

  }
  updateshipmentUserslist(event) {
    if (event.target.checked) {
      this.userShipList.push(event.target.name);
    }
    else {
      if (this.userShipList.indexOf(event.target.name) > -1) {
        this.userShipList.splice(this.userShipList.indexOf(parseInt(event.target.name)), 1);
      }
    }
  }
  checkdate(date1, date2) {
    var date11 = new Date(date1).getTime();
    var date12 = new Date(date2).getTime();
    if (date1 == null || date2 == null) {
      return "+0";
    }
    var diff = date12 - date11;
    var days = Math.round(Math.abs(diff / (1000 * 60 * 60 * 24)));
    if (diff !== undefined) {
      if (!isNaN(diff)) {
        if (diff < 0)
          return "-" + days;
        else {
          return "+" + days;
        }

      }
      else {
        return "+0";
      }
    }
    else {
      alert('invalid start or end date');
    }


  }
  checkdate1(date1, date2) {
    var date11 = new Date(date1).getTime();
    var date12 = new Date(date2).getTime();
    if (date1 == null || date2 == null) {
      return "0 days";
    }
    var diff = date12 - date11;
    var days = Math.round(Math.abs(diff / (1000 * 60 * 60 * 24)));
    if (diff !== undefined) {
      if (!isNaN(diff)) {
        return days + " days";
      }
      else {
        return "0 days";
      }
    }
    else {
      alert('invalid start or end date');
    }


  }
  onItemClick(event, item, val) {
    if (val != "DATA NOT FOUND") {
      if (event.target.parentElement.localName == "collapsible-table-row-detail") {
        if ($(event.target.parentElement.parentElement).hasClass('open-grid')) {
          $(event.target.parentElement.parentElement).removeClass('open-grid');
        }
        else {
          $(event.target.parentElement.parentElement).addClass('open-grid');
        }
      }
      else {
        if ($(event.target.parentElement).hasClass('open-grid')) {
          $(event.target.parentElement).removeClass('open-grid');
        }
        else {
          $(event.target.parentElement).addClass('open-grid');
        }
      }
    }
    else {
      $(event.target.parentElement).removeClass('open-grid');
    }
    this.valConst = 0;
    this.val1 = 0;
    this.val2 = 0;
    this.val3 = 0;
    this.val4 = 0;
    this.val5 = 0;
    this.val6 = 0;
    var currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    console.log("currentDate" + currentDate);
    var date0 = this.datePipe.transform(item.date00, 'MM-dd-yyyy');
    var date1 = this.datePipe.transform(item.date01, 'MM-dd-yyyy');
    var date2 = this.datePipe.transform(item.date02, 'MM-dd-yyyy');
    var date3 = this.datePipe.transform(item.date03, 'MM-dd-yyyy');
    var date4 = this.datePipe.transform(item.date04, 'MM-dd-yyyy');
    var date5 = this.datePipe.transform(item.date05, 'MM-dd-yyyy');
    var date6 = this.datePipe.transform(item.date06, 'MM-dd-yyyy');

    var date10 = this.datePipe.transform(item.date10, 'MM-dd-yyyy');
    var date11 = this.datePipe.transform(item.date11, 'MM-dd-yyyy');
    var date12 = this.datePipe.transform(item.date12, 'MM-dd-yyyy');
    var date13 = this.datePipe.transform(item.date13, 'MM-dd-yyyy');
    var date14 = this.datePipe.transform(item.date14, 'MM-dd-yyyy');
    var date15 = this.datePipe.transform(item.date15, 'MM-dd-yyyy');
    var date16 = this.datePipe.transform(item.date16, 'MM-dd-yyyy');

    var date20 = this.datePipe.transform(item.date20, 'MM-dd-yyyy');
    var date21 = this.datePipe.transform(item.date21, 'MM-dd-yyyy');
    var date22 = this.datePipe.transform(item.date22, 'MM-dd-yyyy');
    var date23 = this.datePipe.transform(item.date23, 'MM-dd-yyyy');
    var date24 = this.datePipe.transform(item.date24, 'MM-dd-yyyy');
    var date25 = this.datePipe.transform(item.date25, 'MM-dd-yyyy');
    var date26 = this.datePipe.transform(item.date26, 'MM-dd-yyyy');

    var date30 = this.datePipe.transform(item.date30, 'MM-dd-yyyy');
    var date31 = this.datePipe.transform(item.date31, 'MM-dd-yyyy');
    var date32 = this.datePipe.transform(item.date32, 'MM-dd-yyyy');
    var date33 = this.datePipe.transform(item.date33, 'MM-dd-yyyy');
    var date34 = this.datePipe.transform(item.date34, 'MM-dd-yyyy');
    var date35 = this.datePipe.transform(item.date35, 'MM-dd-yyyy');
    var date36 = this.datePipe.transform(item.date36, 'MM-dd-yyyy');

    var date40 = this.datePipe.transform(item.date40, 'MM-dd-yyyy');
    var date41 = this.datePipe.transform(item.date41, 'MM-dd-yyyy');
    var date42 = this.datePipe.transform(item.date42, 'MM-dd-yyyy');
    var date43 = this.datePipe.transform(item.date43, 'MM-dd-yyyy');
    var date44 = this.datePipe.transform(item.date44, 'MM-dd-yyyy');
    var date45 = this.datePipe.transform(item.date45, 'MM-dd-yyyy');
    var date46 = this.datePipe.transform(item.date46, 'MM-dd-yyyy');

    var date50 = this.datePipe.transform(item.date50, 'MM-dd-yyyy');
    var date51 = this.datePipe.transform(item.date51, 'MM-dd-yyyy');
    var date52 = this.datePipe.transform(item.date52, 'MM-dd-yyyy');
    var date53 = this.datePipe.transform(item.date53, 'MM-dd-yyyy');
    var date54 = this.datePipe.transform(item.date54, 'MM-dd-yyyy');
    var date55 = this.datePipe.transform(item.date55, 'MM-dd-yyyy');
    var date56 = this.datePipe.transform(item.date56, 'MM-dd-yyyy');
    if ((date0 > currentDate || date1 > currentDate || date2 > currentDate || date3 > currentDate || date4 > currentDate || date5 > currentDate || date6 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val1 = 1;
      this.val2 = 2;
      this.val3 = 2;
      this.val4 = 2;
      this.val5 = 2;
      this.val6 = 2;
    }
    if ((date10 > currentDate || date11 > currentDate || date12 > currentDate || date13 > currentDate || date14 > currentDate || date15 > currentDate || date16 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val2 = 1;
      this.val3 = 2;
      this.val4 = 2;
      this.val5 = 2;
      this.val6 = 2;
    }
    if ((date20 > currentDate || date21 > currentDate || date22 > currentDate || date23 > currentDate || date24 > currentDate || date25 > currentDate || date26 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val3 = 1;
      this.val4 = 2;
      this.val5 = 2;
      this.val6 = 2;
    }
    if ((date30 > currentDate || date31 > currentDate || date32 > currentDate || date33 > currentDate || date34 > currentDate || date35 > currentDate || date36 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val4 = 1;
      this.val5 = 2;
      this.val6 = 2;
    }
    if ((date40 > currentDate || date41 > currentDate || date42 > currentDate || date43 > currentDate || date44 > currentDate || date45 > currentDate || date46 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val5 = 1;
      this.val6 = 2;
    }
    if ((date50 > currentDate || date51 > currentDate || date52 > currentDate || date53 > currentDate || date54 > currentDate || date55 > currentDate || date56 > currentDate) && this.valConst == 0) {
      this.valConst = 1;
      this.val6 = 1;

    }

    var flagDate = 0;
    if (item.latfinal != '' && item.lngfinal != '') {
      this.last_Lat = item.latfinal;
      this.last_Lng = item.lngfinal;
    }
    else {
      if (item.Lat0 != null && item.Lng0 != null) {
        this.last_Lat = item.Lat0;
        this.last_Lng = item.Lng0;
      }
      if (item.Lat1 != null && item.Lng1 != null) {
        this.last_Lat = item.Lat1;
        this.last_Lng = item.Lng1;
      }
      if (item.Lat2 != null && item.Lng2 != null) {
        this.last_Lat = item.Lat2;
        this.last_Lng = item.Lng2;
      }
      if (item.Lat3 != null && item.Lng3 != null) {
        this.last_Lat = item.Lat3;
        this.last_Lng = item.Lng3;
      }
      if (item.Lat4 != null && item.Lng4 != null) {
        this.last_Lat = item.Lat4;
        this.last_Lng = item.Lng4;
      }
      if (item.Lat5 != null && item.Lng5 != null) {
        this.last_Lat = item.Lat5;
        this.last_Lng = item.Lng5;
      }
    }
  }
  exportAsXLSX(): void {
    this.data = this.selectedData;
    var distinct = [];
    for (var i = 0; i < this.data.length; i++) {
      distinct.push({
        ShipmentRef: this.data[i].po_no, Origin: this.data[i].origin, Destination: this.data[i].destination, ContainerNo: this.data[i].container_no,
        Departure: this.data[i].departure, FirstArrival: this.data[i].first_arrival,
        FinalArrival: this.data[i].arrival, ShippingLine: this.data[i].shipping_line,
        Containertypesize: this.data[i].container_type
      });
    };
    this.excelService.exportAsExcelFile(distinct, 'Shipment_Overview');
  }
  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = { path: [], color: 'blue' };
    for (let point of this.polyline) {
      console.log(point)
      newPolyline.path.push(point);
      const speedChanged = this.polyline[i + 1] && (point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) || (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed)
      if (point.speed > this.maxSpeed) {
        newPolyline.color = 'red';
      }
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: 'blue' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;

  }
  showCompanypopup() {
    if (this.editcompany_name == "All Containers" || this.editcompany_name == undefined) {
      this.showErrorNotification('top', 'center', 'Please select valid company name');
      $("#EditDeleteList").modal('hide');
    }
    else
      $("#EditDeleteList").modal('show');
  }
  onSelect(val) {
    debugger;
    this.vale = val.target.options[val.target.options.selectedIndex].value;
    this.editcompany_name = val.target.options[val.target.options.selectedIndex].text;
    if (this.vale == 0) {
      this.selectedData = this.elements;
    }
    else {
      this.selectedData = this.elements.filter(x => x.user_id == this.vale);
    }
  }
  updatecontainerDates() {
    this.usersService.UpdatecontainerDates(this.contaienrNo, this.user_id, this.deprture, this.final_arrival, this.first_arrival).subscribe(res => {
      $("#editdepDates").modal("hide");
      this.showNotification('top', 'center', 'Results will be available in a few minutes in the Overview');
    });
    var data = localStorage.getItem("user_id");
    this.colCount = 0;
    this.ngOnInit();
    this.usersService.GetContainerTrackingdetails(data).subscribe(res => {
      this.elements = res;
      this.selectedData = this.elements;
      for (let i = 0; i < this.elements.length; i++) {
        this.arrivaltime = this.elements[i].arrival;
        this.firstarrivaltime = this.elements[i].first_arrival;

      }

    });
  }
  ondeptChange(val) {
    this.deprture = val.target.value;
  }
  onfirstarrivalChange(val) {
    this.first_arrival = val.target.value;
  }
  onfinalarrivalChange(val) {
    this.final_arrival = val.target.value;
  }
  onSelecttype(val) {
    this.selectType = val;
  }
  onSelecttype1(val) {
    this.containertype = val;
  }
  onSelectrecords(val) {
    //this.selectedData = this.elements.slice(0, val);
    this.config = {
      itemsPerPage: val,
      currentPage: 1,
      totalItems: this.elements.length
    };
  }
  onselectUser(val) {
    debugger;
    this.selectedUser = val;
  }
  onSelectshippingLine(val) {
    this.selecShippingLine = val;
  }
  onSelectshippingLine1(val) {
    this.selecShippingLine1 = val;
  }
  updateDates(dept, firstarrival, finalarrival, containerno, user_id) {
    this.deprture = dept;
    this.first_arrival = firstarrival;
    this.final_arrival = finalarrival;
    this.contaienrNo = containerno;
    this.user_id = user_id;

  }
  updateCompanyDetails() {
    let name = ((document.getElementById("cmp_name") as HTMLInputElement).value);
    var data = localStorage.getItem("user_id");
    this.usersService.updateCompanyAlias(name, data, this.vale).subscribe(res => {
      if (res == "1") {
        $("#EditDeleteList").modal('hide');
        this.showNotification('top', 'center', 'Information submitted successfully');
        this.ngOnInit();
      }
      else {
        this.showErrorNotification('top', 'center', res);
      }
    });
  }
  deleteCompanyDetails() {
    $("#EditDeleteList").modal('hide');
    if (this.editcompany_name == "All Containers" || this.editcompany_name == undefined) {
      this.showErrorNotification('top', 'center', 'Please select valid company name');
      $("#EditDeleteList").modal('hide');
    }
    else{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '420px',
        data: "Are you sure to delete this ?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          var data = localStorage.getItem("user_id");
          this.usersService.deleteCompanyAliasDetails(this.vale, data).subscribe(res =>
          {
            if (res == "1") {
              $("#EditDeleteList").modal('hide');
              this.showNotification('top', 'center', 'Information submitted successfully');
              this.ngOnInit();
            }
            else {
              this.showErrorNotification('top', 'center', res);
            }
          });
        }
      });
    }    
  }
  addShipsgocontainer() {
    if (this.userShipList.length == 0) {
      document.getElementById("addlist_error").style.display = "block";
      return;
    }
    for (var i = 0; i < this.userShipList.length; i++) {
      var data = "";
      this.usersService.getCompanyDetailsByName(this.userShipList[i]).subscribe(res => {
        data = res.Id
        this.Shipsgo_container.user_id = data;
        this.Shipsgo_container.po_no = ((document.getElementById("po_no") as HTMLInputElement).value);
        if (this.Shipsgo_container.po_no == "") {
          document.getElementById("addlist_error").style.display = "block";
          return;
        }
        if (this.checkVal == 1) {
          this.Shipsgo_container.container_no = ((document.getElementById("container_no") as HTMLInputElement).value);
          if (this.Shipsgo_container.container_no == "") {
            document.getElementById("addlist_error").style.display = "block";
            return;
          }
          this.Shipsgo_container.bl_reference_no = "";
        }
        else {
          this.Shipsgo_container.container_no = "";
          this.Shipsgo_container.bl_reference_no = ((document.getElementById("container_no") as HTMLInputElement).value);
          if (this.Shipsgo_container.bl_reference_no == "") {
            document.getElementById("addlist_error").style.display = "block";
            return;
          }
        }
        this.Shipsgo_container.user_id = localStorage.getItem('user_id');
        this.Shipsgo_container.origin = "";
        this.Shipsgo_container.container_type = this.selectType;
        this.Shipsgo_container.destination = "";
        this.Shipsgo_container.departure = '1970-01-01';
        this.Shipsgo_container.arrival = '1970-01-01';
        this.Shipsgo_container.first_arrival = '1970-01-01';
        this.Shipsgo_container.shipping_line = this.selecShippingLine;
        this.Shipsgo_container.status = "";
        this.Shipsgo_container.shipsgo_id = 0;
        this.Shipsgo_container.early_delay = "";
        this.Shipsgo_container.updated_at = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.Shipsgo_container.eta = "";
        this.Shipsgo_container.from_country = "";
        this.Shipsgo_container.to_country = "";
        this.Shipsgo_container.transit_time = "";
        this.Shipsgo_container.first_eta = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.Shipsgo_container.transit_ports = "";
        this.Shipsgo_container.getout_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.Shipsgo_container.empty_return_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.Shipsgo_container.shipment_by = data;
        this.usersService.insertShipgocontainer(this.Shipsgo_container).subscribe(res => {
          this.sts = this.sts + 1;
          if (this.sts == this.userShipList.length) {
            $("#container").modal("hide");
            this.showNotification('top', 'center', 'You have submitted a container and the shipping details are available in a few minutes in the Overview');
            document.getElementById("addlist_error").style.display = "none";
            (<HTMLInputElement>document.getElementById('po_no')).value = '';
            (<HTMLInputElement>document.getElementById('container_no')).value = '';
            var data = localStorage.getItem("user_id");
            if (data != null || data != "") {
              this.usersService.GetContainerTrackingdetails(data).subscribe(res => {
                this.elements = res;
                this.selectedData = this.elements;
                for (let i = 0; i < this.elements.length; i++) {
                  this.arrivaltime = this.elements[i].arrival;
                  this.firstarrivaltime = this.elements[i].first_arrival;

                }
              });
            }
          }
        });

      });




    }
  }
  ConvertString(value) {
    // alert('wel');
    return parseFloat(value)
  }
  ConverttoInt(value1, value2) {
    return (parseInt(value1) - parseInt(value2));
  }
  submitList() {
    var data = localStorage.getItem("user_id");
    var compnay = ((document.getElementById("list_name") as HTMLInputElement).value);
    var email = ((document.getElementById("list_email") as HTMLInputElement).value);
    if (compnay == "" || email == "") {
      document.getElementById("add_list_error").style.display = "block";
      return;
    }
    if (data != null || data != "") {
      this.user.invited_id = data;
    }
    this.user.f_name = "";
    this.user.l_name = "";
    this.user.total_container = 0;
    this.user.address = "";
    this.user.zip_code = "";
    this.user.city_name = "";
    this.user.country_code = "";
    this.user.phone_no = "";
    this.user.cvr_no = "";
    this.user.country_name = "";
    this.user.company_name = compnay;
    this.user.email = email;
    this.user.profile_pic = "contact.png";
    this.user.user_role = 0;
    this.user.status = 1;
    this.user.password = "12345";
    this.user.expiry_date = this.datePipe.transform(new Date().setFullYear(2020), 'yyyy-MM-dd');
    this.user.signup_status = 0;
    this.usersService.insertUsers(this.user).subscribe(res => {
      if (res == "1") {
        $('#ModelAddList').modal('hide');
        this.showNotification('top', 'center', 'Information submitted successfully');
        this.usersService.getCompanydetails(data).subscribe(res => {
          this.dropdownElements = res;
        });
        this.updateUserCheckboxList();
        this.usersService.sendnewUserAddedEmail(email, compnay).subscribe(res => { console.log("1"); });
        document.getElementById("add_list_error2").style.display = "none";
        document.getElementById("add_list_msg").style.display = "block";
        $('#list_name').val("");
        $('#list_email').val("");
      }
      if (res == "0") {
        $('#ModelAddList').modal('hide');
        this.showNotification('top', 'center', 'Error occurred, try again later');
        this.usersService.getCompanydetails(data).subscribe(res => { this.dropdownElements = res });
        this.updateUserCheckboxList();
        $('#list_name').val("");
        $('#list_email').val("");
      }
      if (res == "Email or Company Name already exists!") {
        document.getElementById("add_list_msg").style.display = "none";
        document.getElementById("add_list_error2").style.display = "block";
        this.showNotification('top', 'center', 'Email or Company Name already exists, if forgot password send email to jesper@containertracking.dk');
        this.usersService.getCompanydetails(data).subscribe(res => { this.dropdownElements = res });
        this.updateUserCheckboxList();
      }
    });
    //this.router.navigate(['Shipment']);
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction 
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
  checkText(val) {
    if (val == 1) {
      $("#con_text").text("Container No :");
      this.checkVal = 1;
    } else if (val == 2) {
      $("#con_text").text("Ocean Bill of Lading :");
      this.checkVal = 2;
    }
  };

  updateShipment(ele, c_number, con_type, shipping_line, user_id) {
    console.log(this.po_model_number); //alert(c_number);
    this.po_model_number = ele;
    this.container_model_number = c_number;
    this.containertype = con_type;
    this.selecShippingLine1 = shipping_line;
    this.shipuser_id = user_id;
  }
  deleteContainer(val, id) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      data: "Are you sure to delete this container " + val + '?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var data = localStorage.getItem("user_id");
        this.usersService.deleteContainer(id, val).subscribe(res => {
          this.usersService.GetContainerTrackingdetails(data).subscribe(res => {
            this.elements = res;
            this.selectedData = this.elements;
            for (let i = 0; i < this.elements.length; i++) {
              this.arrivaltime = this.elements[i].arrival;
              this.firstarrivaltime = this.elements[i].first_arrival;

            }


          });
        });
      }
    });
  }


  updateReference() {

    var r_no = ((document.getElementById("txtpono") as HTMLInputElement).value);
    if (r_no == "") {
      document.getElementById("addlist_errorShip").style.display = "block";
      return;
    }
    this.usersService.updateShipmentReference(r_no, this.container_model_number, this.containertype, this.selecShippingLine1, this.shipuser_id).subscribe(res => {
      this.colCount = 0;
      this.ngOnInit();
    });
    $('#ShipmentRef').modal('hide');


  }
  updateUserList() {
    debugger;
    this.usersService.updateUserList(this.contaienrNo, this.selectedUser, this.po_no, this.user_id).subscribe(res => {
      $('#changeUserList').modal('hide');
      this.showNotification('top', 'center', 'Successfully changed the list and updations are available in a few minutes in the Oveview');
      var data = localStorage.getItem("user_id");
      this.usersService.GetContainerTrackingdetails(data).subscribe(res => {
        this.elements = res;
        this.selectedData = this.elements;
        for (let i = 0; i < this.elements.length; i++) {
          this.arrivaltime = this.elements[i].arrival;
          this.firstarrivaltime = this.elements[i].first_arrival;

        }


      });
    });

  }

  showNotification(from, align, msz) {
    const type = ['', 'info', 'success'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>" + msz + "</b>"

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert alert_notify alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"> <i class="mdi mdi-close"></i></button>' +
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
  showErrorNotification(from, align, message) {
    const type = ['', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "",
      message: "<b>" + message + "</b>"

    }, {
        type: type[color],
        timer: 400000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-8 col-sm-3 col-md-3 alert alert_notify alert-danger alert-with-icon" role="alert">' +
          '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"> <i class="mdi mdi-close"></i></button>' +
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
  pageChanged(event) {
    this.config = {
      itemsPerPage: this.selected1,
      currentPage: event,
      totalItems: this.elements.length
    };
  }
}
