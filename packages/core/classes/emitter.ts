/**
 * Emitter class.
 * It doesn't have implementation because it's just a type.
 * Gets overridden by the HiddenEmitter implementation in the decorator
 */

export class Emitter<T> {
  public emit(value: T): void {};
  constructor() {};
}