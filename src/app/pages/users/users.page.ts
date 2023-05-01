import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  selectedService: any;
  serviceProviders: any;
  originalServiceProvider: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const user = localStorage.getItem('User');
    if (user == null) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.http.get('http://localhost:3000/users').subscribe(
        (res) => {
          this.serviceProviders = res;
          this.originalServiceProvider = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onServiceSelect(e: any) {
    this.serviceProviders = this.originalServiceProvider;
    console.log(e.detail.value);
    if (e.detail.value == 'all') {
      return this.serviceProviders;
    } else {
      this.selectedService = e.detail.value;
      this.serviceProviders = this.serviceProviders.filter(
        (serviceProvider: any) => {
          return serviceProvider.service == this.selectedService;
        }
      );
    }
  }
}
