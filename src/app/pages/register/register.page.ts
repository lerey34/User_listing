import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  isServiceProvider: boolean = false;
  service: string = 'none';
  pic!: string;
  bio!: string;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  register() {
    this.isLoading = true;
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      isServiceProvider: this.isServiceProvider,
      service: this.service,
      pic: this.pic,
      bio: this.bio,
    };

    this.http.post('http://localhost:3000/users/register', user).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      (error) => {
        this.isLoading = false;
        this.presentAlert('Registration failed', error.error.error);
      }
    );
  }

  onServiceSelect(e: any) {
    let response = e.detail.value;
    if (response == 'no') {
      this.isServiceProvider = false;
    } else {
      this.isServiceProvider = true;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['ok'],
    });

    await alert.present();
  }
}
