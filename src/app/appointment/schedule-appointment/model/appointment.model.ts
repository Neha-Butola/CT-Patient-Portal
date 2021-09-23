export class Appointment {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public physician: string,
    public date: Date,
    public slot: string,
    public status: boolean = false
  ) {}
}