export interface Friend {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class User {
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  //pseudo: string;
  token: string;
  password: string;
  userId: string;
  friends: {Friend};
  friendRequests: Array<{name: string, message: string, id: string}>;

  constructor(lastName: string, email: string) {
    console.log('User constructor lastName ' + lastName + '; email ' + email);
    this.lastName = lastName;
    this.email = email;
  }
}
