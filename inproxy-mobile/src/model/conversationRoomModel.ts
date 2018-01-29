export class MessageRoomModel {
  content: string;
  author: string;

  constructor(content: string, author: any) {
    this.content = content;
    this.author = author;
  }
}

export class ConversationRoomModel {
  public name: string;
  public message: MessageRoomModel[];
  public id: string;
  public isUserIn: boolean;

  constructor(name: string, message: any, id: string, isUserIn: boolean) {
    this.name = name;
    this.message = message;
    this.id = id;
    this.isUserIn = isUserIn;
  }
}
