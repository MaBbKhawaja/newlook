import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastController, NavController, ModalController, Platform } from '@ionic/angular';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  data;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    })
  }
  public base = "https://iems.online/saloonAPI/";
  constructor(private http: HttpClient, public toastCtrl: ToastController, public navCtrl: NavController, public modalCtrl: ModalController, public platform: Platform) {
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  public setData(data) {
    this.data = data;
  }
  public getData() {
    return this.data;
  }

  getAllData() {
    return this.http
      .get(this.base + 'services.php')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  signIn(email, password) {
    let data = {
      email: email,
      password: password
    }

    return this.http
      .get(this.base + 'login.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  signUp(name, email, password, dob, address, mobile, gender) {
    let data = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      address: address,
      mobile: mobile,
      gender: gender
    }
    return this.http
      .get(this.base + 'signup.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

  }

  editUser(data) {
    // let data = {
    //   name: name,
    //   email: email,
    //   age: age,
    //   address: address,
    //   mobile: mobile,
    //   gender: gender,
    //   user_id:userId
    // }
    return this.http
      .get(this.base + 'updateUser.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

  }

  getSchedules() {
    return this.http.get(this.base + 'time_slots.php')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getLoyaltyPoints(id) {
    return this.http.get(this.base + 'getLoyaltyPoints.php?user_id=' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  bookAppointment(data) {
    return this.http.get(this.base + 'setorder.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getOrders(id) {
    return this.http.get(this.base + 'getOrders.php?user_id=' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  postReview(userId, orderId, comment, stars) {

    let data = {
      user_id: userId,
      order_id: orderId,
      comment: comment,
      stars: stars,
    }

    return this.http.get(this.base + 'setReview.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  cancelAppointment(userId, orderId, reason) {

    let data = {
      user_id: userId,
      order_id: orderId,
      reason: reason
    }

    return this.http.get(this.base + 'cancelOrder.php', { params: data })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  async toastMessage(value) {
    const toast = await this.toastCtrl.create({
      message: value,
      duration: 2000
    });
    toast.present();
  }

}
