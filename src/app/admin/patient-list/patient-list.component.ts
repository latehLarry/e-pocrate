import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from './../../models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  isLoading = false;
  constructor(private patientService: PatientService, private router: Router, public dialog: MatDialog) { }
  listData: MatTableDataSource<any>;
  doctors: Patient[] = [];
  displayedColumns: string[] = ['Patient', 'Photo', 'Email', 'Country', 'Status', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('filter') filter: ElementRef;
  searchkey: string;

  ngOnInit() {
    this.patientService.getAllPatients().subscribe(
      (doctorsList: {doctors: Patient[]}) => {
      this.doctors = doctorsList.doctors;
      this.listData = new MatTableDataSource(this.doctors);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }
  confirmDialog(doctorId): void {


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

    });
  }
  applyFilter() {
    this.listData.filter = this.searchkey.trim().toLowerCase();
  }

  onDelete(patientId: string) {
    this.patientService.deletePatient(patientId).subscribe(res => {
      this.router.navigate(["/patients-list"]);
    })
  }

}
