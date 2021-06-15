import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route);
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    // Get informed about any changes in your route parameters:
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      )
      // The subscription will be set up but only if the parameters then change, we will exchange them in our user object. It can correctly updates data because our observable fires and we then retrieve the updated parameters and assign them to our user object. --> Changes reflected in the template!
      // We don't need this subscribe (observable) addition if the component we're on may never be reloaded from within that component, then simply use snapshot.
  }

  // We don't have to do this here, because Angular will do this for us regarding these route observables. If we add our own observables, we'll have to unsubscribe on our own, like this:
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
