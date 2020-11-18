import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from './../../models/doctor.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from './../../services/doctor/doctor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})
export class FindDoctorComponent implements OnInit {
  docs: Doctor;
  isLoading = false;
  searchText  = '';
  doctorList = [];
  doctorDisplayList = [];

  private doctorId: string;

  constructor(private doctorService: DoctorService, private router: Router, private activeRoute: ActivatedRoute) { }
  listData: MatTableDataSource<any>;
  doctors: Doctor[] = [];
  displayedColumns: string[] = ['Pays', 'Photo', 'Spécialisation', 'Name', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('filter') filter: ElementRef;
  searchkey: string;

  ngOnInit() {
    this.isLoading = true;
    this.doctorService.getAllDoctors().subscribe(
      (doctorsList: {doctors: Doctor[]}) => {
      this.doctorList = doctorsList.doctors;
      this.doctorDisplayList = this.doctorList;
    });
  }

  applyFilter() {
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

  searchDoctor() {
    this.doctorDisplayList = this.doctorList.filter(p => {
      if (!this.searchText) {
        return true;
      }
      const fullname = p.name + ' ' + p.surname + ' ' + p.spec;
      return fullname.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

 
}
