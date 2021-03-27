interface User {
  id: string;
  name: string;
}

export default interface Message {
  id: string;
  text: string;
  dateTime: Date;
  from: User;
  to: User;
}
