import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpLoaderFactory } from './HttpLoaderFactory';
import { AccountFormatPipe } from './account.pipe';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
