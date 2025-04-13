export class Place {
  constructor(
    public id: string,
    public title: string,
    public imageUri: string,
    public address: string,
    public location: {lat: number, lng: number},
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.141241, lng: 127.121 }
  }
}