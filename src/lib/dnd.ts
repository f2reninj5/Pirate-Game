class IdGenerator {
  private id = 0;
  nextId() {
    return this.id++;
  }
}

export const idGenerator = new IdGenerator();
