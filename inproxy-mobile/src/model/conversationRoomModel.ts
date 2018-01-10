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

  constructor(name: string, message: any, id: string) {
    this.name = name;
    this.message = message;
    this.id = id;
  }
}
