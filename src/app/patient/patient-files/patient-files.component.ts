import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from '../../models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-patient-files',
  templateUrl: './patient-files.component.html',
  styleUrls: ['./patient-files.component.css']
})
export class PatientFilesComponent implements OnInit {

  isLoading = true;
  searchText = '';
  displayedList = [];
  fileType = null;
  files: any = [];

  constructor(
    private patientService: PatientService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  searchkey: string;
  ngOnInit(): void {
    this.displayedList = this.files;
    this.patientService.getFiles()
    .subscribe((data: any) => {
      this.isLoading = false;
      this.files = data.files.filter(f => f.type === this.fileType);
      this.displayedList = data.files;
    }, err => {
        this.isLoading = false;
    });

    this.activeRoute.queryParamMap.subscribe(paramMap => {
      this.fileType = paramMap.get('type');
    });
  }


  displayPatientDetails() {

  }
}
