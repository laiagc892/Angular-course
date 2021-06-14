import { EventEmitter, Injectable } from "@angular/core";

import { LoggingService } from "./logging.service";

// Adding this specific metadata (@Injectable) to a service, makes it injectable or that something can be injected in there (it's a receiving service now), and then we can use other services here:
@Injectable()
// Using Angular 6+, you can provide application-wide services in a different way. Instead of adding a service class to the providers[] array in AppModule, you can set the following config in @Injectable():
// @Injectable({providedIn: 'root'})
// Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically. This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.
export class AccountsService {
  // Since "accounts" here is an array, it is a reference type (JS behavior).
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }
  
  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }

}