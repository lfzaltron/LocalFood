export default interface Ad {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  imageUrl: string;
  user: {
    id: string;
    name: string;
  };
  date: Date;
  latitude: number;
  longitude: number;
  distance: number | undefined;
}
