import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler)
  // Intercept: The first argument is a request object, and the second is a function which will forward the request because the interceptor will basically run code before your request leaves your app, so before it really is sent and right before the response is forwarded to subscribe, so it steps into that request flow and next is a function you need to call to let the request continue its journey.
}