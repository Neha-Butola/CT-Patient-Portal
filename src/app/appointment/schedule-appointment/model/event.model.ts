export class AppEvent {
  constructor(
    public title: string,
    public duration: number,
    public start: Date
  ) {}
}
