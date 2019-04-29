

interface IContact {
    id?: number;
    title?: string;
    filmGenre?: string;
    releaseDate?: string;
    review?: string;
    editing?: boolean;
    rating?: number;
}



export class Contact {

    public id?: number;
    public title?: string;
    public filmGenre?: string;
    public releaseDate?: string;
    public review?: string;
    public editing?: boolean;
    public rating?: number; // is a number or null
  filmDate: string;

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
