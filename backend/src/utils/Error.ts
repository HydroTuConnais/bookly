export class ErrorClass implements ErrorClass {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      this.status = status;
      this.message = message;
    }
  }