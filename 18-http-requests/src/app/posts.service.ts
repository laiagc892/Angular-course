import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};  // The right side of the colon refers to the method arguments on "createAndStorePost".
    
    // Writting .json at the end is only a requirement by that Firebase REST API.
    // Normally we send JSON data when interactin with a RESTful API and actually, that will happen here as well but the Angular HttpClient will take our Javascript object here and automatically convert it to JSON data for us.
    this.http
      .post<{ name: string }>(
        'https://angular-course-49b92-default-rtdb.europe-west1.firebasedatabase.app/posts.json', 
        postData,
        {
          observe: 'response'   // With observe, you can change the kind of data you get back (and not only get the body on the "responseData").
        }
      ).subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
      // Requests are only sent when we subscribe: Angular (the HttpClient) will automatically extract the data attached to the response, so the response body and give you that. No subscription, no request!
  }

  fetchPosts() {
    // To set multiple (query) params: variable search params, this object is immutable, so you actually need to overwrite it with a new, with the result of append.
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    // The get method is a so-called generic method. This means you can add angled brackets "<>" here and between the angled brackets, you store the type which this response will actually return as a body once it's done.
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-course-49b92-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-header': 'Hello' }),
          // params: new HttpParams().set('print', 'pretty')  // To set just one query param key-pair.
          params: searchParams,  // Multiple query params.
          responseType: 'json'
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            // It is a good practice to wrap this with an "if" statement if you're using a for/in loop where you check if response data has key as its own property so that you're not trying to access the property of some prototype.
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });   // "..." is the Spread Operator.
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);   // Observable created by throw error.
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://angular-course-49b92-default-rtdb.europe-west1.firebasedatabase.app/posts.json', {
        observe: 'events',
        responseType: 'json'  // json is the default type, also there is 'text', 'blob'(for files)...
        // It is used when you don't want Angular to parse it to a Javascript object (json).
      })
      .pipe(
        tap(event => {
          // Tap operator won't interrupt the normal observable data flow, it just taps in there, allows you to do something but then automatically lets the response pass through.
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

}