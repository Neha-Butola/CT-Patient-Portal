export class Billing {
  constructor(
    public id: string,
    public billNo: number,
    public title: string,
    public physician: string,
    public billDate: Date,
    public consultation: number
  ) {}
}
