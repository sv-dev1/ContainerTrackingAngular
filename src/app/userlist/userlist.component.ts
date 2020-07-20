import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSort} from '@angular/material';
import {PageEvent} from '@angular/material';

import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


declare var $: any;

export interface UserListElement {
  firstname: string;
  lastname: string;
  companyname: string;
  email: string;
  password: string;
  userrole: string;
 
}



@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit {
  [x: string]: any;
  elements: any;
  length=100;
  pageSize=10;
  pageSizeOptions=[10,20,30,40];
 
  public displayedColumns = ['f_name', 'l_name',  'company_name', 'email','password','user_role','status','actions'];
  
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
   
  private router: Router, private datePipe: DatePipe,public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public first_name: any;
  public last_name: any;
  public company_name: any;
public user_id:any;
  ngOnInit() {

    this.LoadData();

  }

  LoadData()
  {
    this.usersService.getallUserDetails().subscribe(res => {
      console.log(res);
    this.elements=new MatTableDataSource(res);
    this.elements.sort = this.sort;
    this.elements.paginator = this.paginator;
   });
    
  }


  public doFilter = (value: string) => {
    this.elements.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(id): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '420px',
        data: "Do you confirm the deletion of this data?"
      });
  dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked');
          this.usersService. deleteUser(id).subscribe(res => {
            this.LoadData();
          });
          
        }
      });
    }

    
  openActiveDialog(status,id): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '420px',
        data: "Are you sure you want to Update Status?"
      });
  dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked');
          if(status==1)
             status='-1';
         else
         status='1';
          this.usersService. updateUserStatus(id,status).subscribe(res => {
          this.LoadData();
          });
    
        }
      });
    }

    
  ContainerList(id) {
     this.router.navigate(['/containerlist'], {queryParams:{Id: id}})
    }

  editUser(fName, lName, cName, userId) {
    debugger;
      this.first_name = fName;
      this.last_name = lName;
      this.company_name = cName; 
      this.user_id=userId;     
    }

    updateUser() {
      debugger;
      var f_name = ((document.getElementById("txtfname") as HTMLInputElement).value);
      var l_name = ((document.getElementById("txtlname") as HTMLInputElement).value);
      var c_name = ((document.getElementById("txtcname") as HTMLInputElement).value);
      if (f_name == "" || l_name == "" || c_name == "") {
        document.getElementById("addlist_errorShip").style.display = "block";
        return;
      }
      this.usersService.updateCompanyDetails(f_name,l_name,c_name, this.user_id).subscribe(res => {
        this.ngOnInit();
      });
      $('#userEdit').modal('hide');
  
  
    }
}
