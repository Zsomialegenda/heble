import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "top"})),
     provideHttpClient(withInterceptorsFromDi()),
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}
    ]
};

