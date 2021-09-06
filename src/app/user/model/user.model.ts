export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date /* Private because the token should not be retrievable like this, instead

when the user or you as a developer want to get access to the token, you should actually be required

to do that in a way that will automatically check the validity and this can be achieved by adding a

getter */
  ) {}

  get token() {
    /*A getter here looks like a function, we add parentheses and then a function body
    but you actually access it like a property, so you will be able to do something like user.token. */
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
