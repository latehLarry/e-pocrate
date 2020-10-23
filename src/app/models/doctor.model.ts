export class Doctor {
  id: string;
  name: string;
  surname: string;
  email: string;
  tel: string;
  dob: string;
  photo: string;
  address: string;
  postal_code: string;
  country: string;
  city: string;
  spec: string;
  ref_no: string;
  doc_order: string;
  faculty: string;
  city_obt: string;
  ctry_obt: string;
  username: string;
  gender: string;
  password: string;
  certify: string;
  creation_date: string;
  active: string;

  static toFormData = (doctor): FormData => {
    const postData = new FormData();
    postData.append('name', doctor.name);
    postData.append('surname', doctor.surname);
    postData.append('email', doctor.email);
    postData.append('tel', doctor.tel);
    postData.append('dob', doctor.dob);
    postData.append('photo', doctor.photo);
    postData.append('address', doctor.address);
    postData.append('postal_code', doctor.postal_code);
    postData.append('country', doctor.country);
    postData.append('city', doctor.city);
    postData.append('spec', doctor.spec);
    postData.append('ref_no', doctor.ref_no);
    postData.append('doc_order', doctor.doc_order);
    postData.append('faculty', doctor.faculty);
    postData.append('city_obt', doctor.city_obt);
    postData.append('ctry_obt', doctor.ctry_obt);
    postData.append('username', doctor.username);
    postData.append('gender', doctor.gender);
    postData.append('password', doctor.password);
    postData.append('certify', doctor.certify);

    return postData;
  }
}
