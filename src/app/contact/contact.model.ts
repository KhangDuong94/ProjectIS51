

interface IContact {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    editing?: boolean;
    rating?: number;
}

interface IPerson {
    name: string;
    school: string;
    age: number;
}

export class Contact {

    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public phone?: string;
    public editing?: boolean;
    public rating?: number; // is a number or null
  fullName: string;

    constructor(contact: IContact) {
        contact.editing = this.setState(contact);
        Object.assign(this, contact);
    }

    setState(contact: IContact) {

        // tslint:disable-next-line:triple-equals
        if (contact == null || Object.keys(contact).length == 0) {
            return true;
        }

        let editing = false;
        Object.keys(contact).forEach((key) => {
            if (contact[key] == null) {
                editing = true;
            }
        });
        return true;
    }
}
