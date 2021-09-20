export class Appointment {
  constructor(
    public id: number,
    public userId: string,
    public date: Date,
    public provider: string,
    public slot: string
  ) {}
}
