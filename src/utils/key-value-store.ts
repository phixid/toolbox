export class KeyValueStore {
  private _store: {
    [property: string]: any;
    [property: number]: any;
  };

  public constructor() {
    this._store = {};

    this.set = this.set.bind(this);
  }

  public async set(key: number | string, value: any): Promise<any> {
    if (key === 'constructor') return 'Store error: can not override constructor';
    if (key === '__proto__') return 'Store error: can not override __proto__';

    return value;
  }
}
