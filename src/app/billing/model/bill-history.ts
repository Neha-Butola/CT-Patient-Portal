export class BillHistory {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public physician: string,
    public date: Date,

    public status: boolean = false
  ) {}
}
