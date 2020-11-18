import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from '../../models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-patient-rdv',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.css']
})
export class PatientConsultationComponent implements OnInit {

  isLoading = false;
  searchText = '';
  displayedList = [];
  bookings: any = [];
  doctor = {
    id: "test"
  };
  constructor(private patientService: PatientService, private router: Router) { }
  searchkey: string;
  ngOnInit(): void {
    this.displayedList = this.bookings;
    this.patientService.getBookings()
    .subscribe((data: any) => {
      this.bookings = data.bookings.filter(f => f.type === 'teleconsultations');
      this.displayedList = data.bookings;
      });

  }


  displayPatientDetails() {

  }
}