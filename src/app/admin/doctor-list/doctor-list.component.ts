import { Router } from '@angular/router';
import { DoctorService } from './../../services/doctor/doctor.service';
import { Doctor } from './../../models/doctor.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  isLoading = false;
  constructor(private doctorService: DoctorService, private router: Router) { }
  listData: MatTableDataSource<any>;
  doctors: Doctor[] = [];
  displayedColumns: string[] = ['Médecin', 'Photo', 'Email', 'Country', 'Status', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('filter') filter: ElementRef;
  searchkey: string;

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe(
      (doctorsList: {doctors: Doctor[]}) => {
      this.doctors = doctorsList.doctors;
      this.listData = new MatTableDataSource(this.doctors);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }

  applyFilter() {
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

  onDelete(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(res => {
      this.router.navigate(["/doctors-list"]);
    })
  }

}
