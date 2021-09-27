export class Billing {
  constructor(
    public id: string,
    public physician: string,
    public appointment: string,
    public consultationFee: number
  ) {}
}
