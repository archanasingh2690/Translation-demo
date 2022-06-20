import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoaderFactory } from './HttpLoaderFactory';
import { AccountFormatPipe } from './account.pipe';
import { HttpInterceptor } from './http.interceptor';
import { UserAccountInfoApiService, UserAccountInfoService } from './user-account-info.service';
import { AppRoutingModule } from './app.routing.module';
import { InvModule } from './modules/inv/inv.module';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert/alert.component';
import { ErrorCatchingInterceptor } from './http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AccountFormatPipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    InvModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptor,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
    UserAccountInfoService, UserAccountInfoApiService,
    AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
