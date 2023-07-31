export default class ConflictError extends Error {
  statusCode: number;
  name: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
  }
}
