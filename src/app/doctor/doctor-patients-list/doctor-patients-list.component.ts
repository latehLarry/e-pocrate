import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-message',
  templateUrl: './doctor-patients-list.component.html',
  styleUrls: ['./doctor-patients-list.component.css']
})
export class DoctorPatientsListComponent implements OnInit {
  isLoading = false;
  searchText = '';
  displayedList = [];
  patients: any = [{
      name: "Fallou",
      surname: "Fall",
      id: "test2",
      date: "2020-11-08"
  }, {
      name: "Christian",
      surname: "Lam",
      id: "test3",
      date: "2020-11-07"
  }];
  doctor = {
    id: "test"
  };
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.displayedList = this.patients;
    this.doctorService.loadDoctorPatients()
    .subscribe(data => {
      this.patients = data;
      this.displayedList = this.patients;
      });

  }
  searchPatient() {
    this.displayedList = this.patients.filter(p => {
      if (!this.searchText) {
        return true;
      }
      const fullname = p.name + ' ' + p.surname;
      return fullname.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  displayPatientDetails() {

  }
}
