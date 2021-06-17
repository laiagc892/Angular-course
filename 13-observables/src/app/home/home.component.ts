import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    // Interval is a predefined observable that fires a number every x miliseconds you set on ().
    // interval(1000) it's the observable here. So we're not storing the observable on firstObsSubscription, we store the subscription that subscribe returns.
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    // Creating a custom Observable:
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'))
        }
        count++;
      }, 1000);
    });
    
    // Operators
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data =>{
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + data;
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy() {
    // Clear the subscription and prevent memory leaks, because we're not keeping old subscriptions around.
    this.firstObsSubscription.unsubscribe();
  }

}
