export class IdGenerator {
  private id = 0;
  nextId() {
    return this.id++;
  }
}
