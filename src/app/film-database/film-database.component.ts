import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localStorageService';
import { ContactComponent } from '../contact/contact.component';
import { Contact } from '../contact/contact.model';
import { Http } from '@angular/http';
import { IUser } from '../login/login.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-database',
  templateUrl: './film-database.component.html',
  styleUrls: ['./film-database.component.css']
})
export class FilmDatabaseComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParam = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;
  constructor(private router: Router, private http: Http, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
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
  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/Films.json').toPromise();
    console.log('[loadItemsFromFile] data:', data);
    return data.json();
  }

  getItemsFromLocalStorage(key: string) {
    return this.localStorageService.getItemsFromLocalStorage();

  }
}

