

export class ConversationRoomModel {
  public name: string;
  public message: string[];
  public id: string;

  constructor(name: string, message: any, id: string) {
    this.name = name;
    this.message = message;
    this.id = id;
  }
}
