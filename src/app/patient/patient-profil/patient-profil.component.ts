import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { UserService } from '../../services/user/user.service';
import { Doctor } from '../../models/doctor.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-patient-profil',
  templateUrl: './patient-profil.component.html',
  styleUrls: ['./patient-profil.component.css']
})
export class PatientProfilComponent implements OnInit {

    constructor(private patientService: PatientService, private activeRoute: ActivatedRoute, private userService: UserService) { }
    patient = null;
    ngOnInit() {
      const user = this.userService.getUser();
      this.patientService.getPatientById(user._id)
        .subscribe(data => {
          this.patient = data;
        });
    }

}
