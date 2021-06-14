import { Component } from '@angular/core';

import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // Add providers property on the decorator to use the services (Angular recognizes that it should be able to give us a LoggingService and it will set itself up to be able to do so):
  // Here we say: We tell WHICH INSTANCE of the service. If we don't want to overwrite the 'parent' instance, we need to remove the serviceName from here.
  // providers: [LoggingService, /* AccountsService */]
})
export class NewAccountComponent {

  // "private": TypeScript shortcut adding an accessor in front of the name of the argument to instantly create a property with the same name and bind the value to it.
  // To use a service, you need to add a type assignment to its name, not optional, and the type has to be the class you want to get injected.
  // We are not creating an instance of this class (of th service) manually, Angular does it for us (INJECTING THE SERVICE).
  // Here we say: We want AN INSTANCE of the service.
  constructor(private loggingService: LoggingService,
              private accountService: AccountsService) {
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // Using AccountService service methods:
    this.accountService.addAccount(accountName, accountStatus);
    // Using LoggingService service methods:
    // this.loggingService.logStatusChange(accountStatus);
  }
}
