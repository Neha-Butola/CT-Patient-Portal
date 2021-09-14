export class Appointment {
  constructor(
    public date: Date,
    public provider: string,
    public slot: string
  ) {}
}
