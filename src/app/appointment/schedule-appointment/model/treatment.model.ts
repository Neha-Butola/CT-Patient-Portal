export class Treatment {
  constructor(
    public userId: string,
    public name: string,
    public physician: string,
    public booked: boolean = false
  ) {}
}
