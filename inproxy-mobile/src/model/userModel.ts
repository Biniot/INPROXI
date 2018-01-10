export interface Friend {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class User {
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarPath: string;
  //pseudo: string;
  public token: string;
  public password: string;
  public userId: string;
  public friends: {Friend};
  public friendRequests: Array<{name: string, message: string, id: string}>;

  constructor(lastName: string, email: string, firstName: string, avatarPath: string) {
    console.log('User constructor lastName ' + lastName + '; email ' + email);
    this.lastName = lastName;
    this.email = email;
    this.avatarPath = avatarPath;
    this.firstName = firstName;
  }
}
