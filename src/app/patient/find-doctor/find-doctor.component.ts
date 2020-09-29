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
      this.doctors = doctorsList.doctors;
      this.listData = new MatTableDataSource(this.doctors);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  applyFilter() {
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

 
}
