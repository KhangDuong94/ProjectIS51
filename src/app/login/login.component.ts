import { Component, OnInit } from '@angular/core';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();
    if (this.currentUser != null) {
      this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {
    // console.log('from login user: ', user);
    const defaultUser: IUser = { username: 'msosa', password: 'ms12345' };
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log user in
        // store user in local storage
        this.localStorageService.saveItemsToLocalStorage(user);
        // nav to main page
        this.router.navigate(['contacts', user]);
      } else {
        console.log('wrong');
        // show error toast user
        this.toastService.showToast('danger', 'Your username and password do not match. Please try again.', 5000);
      }

    } else {
      console.log('empty');
      // show error toast user
      this.toastService.showToast('warning', 'Please enter a username or password', 5000);
    }
  }

}
