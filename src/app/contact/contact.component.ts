import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { isNgTemplate } from '@angular/compiler';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParam = '';
  constructor(private http: Http) { }

  async ngOnInit() {
    this.loadContacts();
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
    return data.json();
  }

  addContact() {
    this.contacts.unshift(new Contact({}));
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveItemsToLocalStorage(this.contacts);

  }

  saveContact(contact: any) {
    contact.editing = false;
    this.sortbyID(this.contacts);
  }

  saveItemsToLocalStorage(contacts: Array<Contact>) {
    const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('from saveItemsToLocalStorage saved Contacts: ', savedContacts);
    return savedContacts;
  }

  getItemsFromLocalStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    return savedContacts;
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

}





