import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../Users.service';
import { Users } from '../Users';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatInputModule } from '@angular/material';
import {MatSort} from '@angular/material';
import {PageEvent} from '@angular/material'

declare var $: any;


@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.css']
})



export class LoglistComponent implements OnInit{
 
  
   elements: any;
   length=100;
   pageSize=5;
   pageSizeOptions=[5,10,20,30];
     
  
  //public elements = new MatTableDataSource<LogClass>();
  public displayedColumns = ['id', 'email',  'login_time', 'logout_time','login_result','user_agent','source_ip'];
  constructor(private formbulider: FormBuilder, private usersService: UsersService, private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe) 
    { 


    }
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
   ngOnInit() {

    debugger;
    this.usersService. getUserlogDetails().subscribe(res => {
    //this.elements = JSON.parse(res);   
    this.elements=new MatTableDataSource(res);
    this.elements.sort = this.sort;
    this.elements.paginator = this.paginator;

    });

    }

    ngAfterViewInit() {
      debugger;
     // this.elements.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.elements.filter = value.trim().toLocaleLowerCase();
  }

   
}




