export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public provider: string,
    public slot: string
  ) {}
}
