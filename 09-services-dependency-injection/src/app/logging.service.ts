// A Service is a normal TypeScript class, without a Decorator
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}