export enum Primitives {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
}

export enum NonPrimitives {
  ListAny = '[]',
  ListBoolean = 'boolean[]',
  ListNumber = 'number[]',
  ListString = 'string[]',
  Object = 'object',
}

export class TypeValidator {
  private readonly type: NonPrimitives | Primitives;

  constructor(type: NonPrimitives | Primitives) {
    this.type = type;
  }

  public validate = (value: any): boolean => {
    if (this.typeIsPrimitive()) return this.valueIsPrimitive(value);
    if (this.typeIsListOfAny() || this.typeIsListOfPrimitives()) return this.valueIsList(value);
    if (this.typeIsObject()) return this.valueIsObject(value);
    return false;
  };

  private typeIsPrimitive = (): boolean => Object.values(Primitives as any).includes(this.type);
  private typeIsListOfAny = (): boolean => this.type === NonPrimitives.ListAny;
  private typeIsListOfPrimitives = (): boolean => {
    return (
      this.type === NonPrimitives.ListBoolean ||
      this.type === NonPrimitives.ListNumber ||
      this.type === NonPrimitives.ListString
    );
  };
  private typeIsObject = (): boolean => this.type === NonPrimitives.Object;

  private valueIsPrimitive = (value: any): boolean => typeof value === this.type;
  private valueIsList(value: any) {
    if (!Array.isArray(value)) return false;
    if (this.typeIsListOfAny()) return true;
    if (this.typeIsListOfPrimitives() && value.length < 1) return false;

    return value.length === value.filter((x: any) => this.type.startsWith(typeof x)).length;
  }
  private valueIsObject = (value: any) => {
    if (value === null) return false;
    if (Array.isArray(value)) return false;
    return typeof value === this.type;
  };
}
