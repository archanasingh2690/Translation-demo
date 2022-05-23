import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoaderFactory } from './HttpLoaderFactory';
import { AccountFormatPipe } from './account.pipe';
import { HttpInterceptor } from './http.interceptor';
import { UserAccountInfoApiService, UserAccountInfoService } from './user-account-info.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountFormatPipe
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
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptor,
    multi: true
  }, UserAccountInfoService,UserAccountInfoApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
