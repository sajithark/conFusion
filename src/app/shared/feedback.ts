export class Feedback {
    firstname : string;
    lastname : string;
    telenum : number;
    email : string;
    contactType : string;
    message : string;
    agree : boolean;
}

export const CONTACTTYPE = ['None', 'Telephone', 'Email'];