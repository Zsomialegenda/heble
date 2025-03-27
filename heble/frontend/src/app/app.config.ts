import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SessionService } from './services/session.service';

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "top"})), // navigálás esetén mindig a webalkalmazás tetejére dob
     provideHttpClient(withInterceptorsFromDi()), // Http kliens biztosítása
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}, // interceptor biztosítása tokenhez kötött kérések végrehajtásához
     {provide: HTTP_INTERCEPTORS, useClass: SessionService, multi:true} // interceptor biztosítása a felhasználói munkamenet ellenőrzésére
    ]
};

