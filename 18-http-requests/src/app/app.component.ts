import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
      // We will get that HTTP error response object by Angular and it will have an error key but the detailed content of what's in there depends on the API you're talking to.
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request:
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}

// SERVICES vs. COMPONENTS
// Services are the parts in your Angular application that do the heavy lifting, the dirty work and your components are relatively lean, as lean as they can be and are mostly concerned with template related work.

// SERVICES & COMPONENTS
// The sending of the request and the transformation of the data, now lives in the service and this is a best practice when working with Angular and HTTP requests.

// Service component SPLIT:
// Move the part that is related to your template, which in my case here is managing the loading status and managing the loaded data, move that into the component and be informed about the result of your HTTP request by subscribing in the component but move the rest into the service and simply return the observable there so that you set up everything in the service but you can subscribe in the component.