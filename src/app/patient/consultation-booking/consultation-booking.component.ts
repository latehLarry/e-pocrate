import { ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from './../../services/doctor/doctor.service';
import { Doctor } from './../../models/doctor.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
declare var Stripe;
@Component({
  selector: 'app-consultation-booking',
  templateUrl: './consultation-booking.component.html',
  styleUrls: ['./consultation-booking.component.css']
})
export class ConsultationBookingComponent implements OnInit, AfterViewInit {

  doctor: Doctor;
  stripe = null;
  private doctorId: string;
  booking = {
    date: "2020-11-08",
    time: "10:00",
    complain: "",
    isForSibling: false,
    type: ""
  };
  sibling = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    address: ""
  };
  cardErrors = {
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    touched: false
  };
  bookingPricing = {
    generalist: {
      day: 25,
      night: 55,
      midnight: 75,
      weekend_fees: 20
    },
    dentiste: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    gyneco_sage_femme: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    cardio: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    dermato: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    pediatre: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    allerlogie: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    nutri_diet: {
      day: 45,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    pneumo: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    rhumatologue: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    orthopedie: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    psychatre: {
      day: 45,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    orthophone: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    },
    orthodone: {
      day: 30,
      night: 60,
      midnight: 75,
      weekend_fees: 25
    }
  };
  price = 0;
    constructor(
      private doctorService: DoctorService,
      private patientService: PatientService,
      private activeRoute: ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("doctorId")) {
          this.doctorId = paramMap.get("doctorId");
          this.doctorService.getDoctorById(this.doctorId).subscribe(postData => {
            this.doctor = {
              id: postData._id,
              name: postData.name,
              surname: postData.surname,
              email: postData.email,
              tel: postData.tel,
              dob: postData.dob,
              photo: postData.photo,
              address: postData.address,
              postal_code: postData.postal_code,
              country: postData.country,
              city: postData.city,
              spec: postData.spec,
              ref_no: postData.ref_no,
              doc_order: postData.doc_order,
              faculty: postData.faculty,
              city_obt: postData.city_obt,
              ctry_obt: postData.ctry_obt,
              username: postData.username,
              gender: postData.gender,
              password: postData.password,
              certify: postData.certify,
              creation_date: postData.creation_date,
              active: postData.active
            }
          })
        }
      })

      this.activeRoute.queryParamMap.subscribe(paramMap => {
        this.booking.type = paramMap.get('type');
      })
      this.stripe = Stripe('pk_test_Kg45StmTwhWoMRegHrF0FYgW00DUMRIFk5');
    }
    ngAfterViewInit() {
      this.setupStripe();
    }

    processPrice() {
      const specialite = 'generalist';
      const isWeekEnd = this.isWeekEnd();
      const dayTime = this.getBookingDayTime();
      const normalPrice = this.bookingPricing[specialite][dayTime];
      const fees =  isWeekEnd ?  this.bookingPricing[specialite]['weekend_fees'] : 0;
      const feesDeplacement = this.booking.type === 'rdv' ? 7.50 : 0;
      return normalPrice + fees + feesDeplacement;
    }

    isWeekEnd() {
      const bookingDate = new  Date(this.booking.date);
      const day = bookingDate.getDay();
      return day === 0 || day === 6;
    }

    getBookingDayTime() {
      const bookingDate = new Date(this.booking.date + 'T' + this.booking.time);
      console.log({bookingDate});
      const hour = bookingDate.getHours();
      console.log({hour});
      if (hour >= 8 && hour < 20) {
        return 'day';
      } else if (hour >= 20) {
        return 'night';
      } else if (hour >= 0 && hour < 8) {
        return 'midnight';
      }
    }

    setupStripe() {
      const elements = this.stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
          },
        ]
      });
      const elementStyles = {
        base: {
          color: '#32325D',
          fontWeight: 500,
          fontFamily: 'Nunito, Consolas, Menlo, monospace',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#CFD7DF',
          },
          ':-webkit-autofill': {
            color: '#e39f48',
          },
        },
        invalid: {
          color: '#E25950',
          '::placeholder': {
            color: '#FFCCA5',
          },
        },
      };
      const elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
      };

      const cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardNumber.mount('#card-number')
      const cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardExpiry.mount('#card-expiry');

      const cardCvc = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardCvc.mount('#card-cvc');


      cardNumber.on('change', (event) => {
        this.cardErrors.touched = true;
        if (event.error) {
          this.cardErrors.cardNumber = event.error.message;
        } else {
          this.cardErrors.cardNumber = '';
        }
      });
      cardCvc.on('change', (event) => {
        this.cardErrors.touched = true;
        if (event.error) {
          this.cardErrors.cardCvc = event.error.message;
        } else {
          this.cardErrors.cardCvc = '';
        }
      });
      cardExpiry.on('change', (event) => {
        this.cardErrors.touched = true;
        if (event.error) {
          this.cardErrors.cardExpiry = event.error.message;
        } else {
          this.cardErrors.cardExpiry = '';
        }
      });
    }

    checkBooking() {
      const today = new Date();
      return new Date(this.booking.date + 'T' + this.booking.time) > today;
    }
    checkComplain() {
      return this.booking.complain && this.booking.complain.length > 3 ;
    }

    checkSibling() {
      if (!this.booking.isForSibling) {
        return true;
      }
      return this.sibling.name && this.sibling.surname && this.sibling.phone;
    }

    checkPaymentForm() {
      return this.cardErrors.touched && this.cardErrors.cardCvc === '' && this.cardErrors.cardExpiry === '' && this.cardErrors.cardNumber === '';
    }

    checkForm() {
      return this.checkBooking() && this.checkSibling() && this.checkComplain() && this.checkPaymentForm();
    }


    confirmBooking() {
      if (this.checkForm()) {
        this.patientService.addBooking({
          ...this.booking,
          sibling: this.sibling,
          doctorId: this.doctorId
        })
        .subscribe(data => {
          alert("Rendez vous confirmer");
        })
      }
    }
  

}
