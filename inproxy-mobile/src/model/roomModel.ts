import {ILatLng} from "@ionic-native/google-maps";

export class Room {
  id: string;
  coords: ILatLng[];
  name: string;
  admin_id: string;

  // constructor(lastName: string, email: string) {
  //   console.log('User constructor lastName ' + lastName + '; email ' + email);
  //   this.lastName = lastName;
  //   this.email = email;
  // }
}
