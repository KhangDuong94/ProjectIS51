import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { isNgTemplate } from '@angular/compiler';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { longStackSupport } from 'q';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParam = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;
  ratings: number[];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,

  ) {
    this.localStorageService = new LocalStorageService('contacts');
    this.ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
    if (currentUser == null) {
      this.router.navigate(['login']);
    }
    this.loadContacts();
    this.activatedRoute.params.subscribe((data: IUser) => {
      console.log('data passed from login component to this component: ', data);
      this.currentUser = data;
    });

  }

  async loadContacts() {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if (savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      this.contacts = await this.loadItemsFromFile();
    }
    this.sortbyID(this.contacts);
  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('[loadItemsFromFile] data:', data);
    return data.json();
  }

  addContact() {
    // take the max of all existing ids and add 1
    let maxId = 0;
    for (const contact of this.contacts) {
      if (contact.id > maxId) {
        maxId = contact.id;
      }
    }

    this.contacts.unshift(new Contact({
      id: maxId + 1,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      rating: 0,
    }));

  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveItemsToLocalStorage(this.contacts);

  }

  addRating(i: number, rating: number) {
    const contact = this.contacts[i]; // contact is the object at index i of the contacts array
    contact.rating = rating; // assign 5 to the rating of this contact
  }

  saveContact(contact: any) {
    // const id = contact.id;
    // const firstName = contact.firstName;
    // const lastName = contact.lastName;
    let hasError = false;
    Object.keys(contact).forEach((key: any) => {
      if (contact[key] == null) {
        hasError = true;
        this.toastService.showToast(
          'danger',
          `Save failed! Property ${key} must not be empty`,
          2000
        );
      }
    });

    if (!hasError) {
      contact.editing = false;
      this.saveItemsToLocalStorage(this.contacts);
      this.sortbyID(this.contacts);
    }

  }

  saveItemsToLocalStorage(contacts: Array<Contact>) {
    return this.localStorageService.saveItemsToLocalStorage(contacts);
    // const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
    // console.log('from saveItemsToLocalStorage saved Contacts: ', savedContacts);
    // return savedContacts;
  }

  getItemsFromLocalStorage(key: string) {
    return this.localStorageService.getItemsFromLocalStorage();
    // const savedContacts = JSON.parse(localStorage.getItem(key));
    // return savedContacts;
  }


  searchContact(params: string) {

    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;

      console.log('full name is ---->', fullName);
      if (params === item.fullName || params === item.firstName || params === item.lastName) {
        return true;
      } else {
        return false;
      }
    });

  }

  sortbyID(contacts: Array<Contact>) {
    contacts.sort((prevContact: Contact, presContact: Contact) => {
      return prevContact.id > presContact.id ? 1 : -1;
    });

  }
  setRating(contact: Contact, rating: number) {
    contact.rating = rating;
  }

  logout() {
    // clear localStorage
    this.localStorageService.clearItemFromLocalStorage('user');
    // navigate to login
    this.router.navigate(['']);

  }

  getSelectValue() {
    const selectValue = document.getElementById('dropdown-menu');
  }


}
