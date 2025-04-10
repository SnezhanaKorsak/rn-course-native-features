export class Place {
  public id: string;

  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public location: {lat: number, lng: number},
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.141241, lng: 127.121 }
    this.id = new Date().toString() + Math.random().toString();
  }
}