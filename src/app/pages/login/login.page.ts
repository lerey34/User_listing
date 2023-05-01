import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  isLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('User');
    if (user != null) {
      this.router.navigateByUrl('/users', { replaceUrl: true });
    }
  }

  login() {
    this.isLoading = true;
    let credentials = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post('http://192.168.1.30:3000/users/login', credentials)
      .subscribe(
        (res) => {
          this.isLoading = false;
          localStorage.setItem('User', JSON.stringify(res));
          this.router.navigateByUrl('/users', { replaceUrl: true });
        },
        (error) => {
          this.isLoading = false;
          this.presentAlert('Login Failed', error.error.error);
        }
      );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['ok'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
