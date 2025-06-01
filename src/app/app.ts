import { Component, Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayersComponent } from './players/players.component';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedReq);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    HttpClientModule
],
  
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers:[
    {
       provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class App {
  protected title = 'AdminUi';
}
