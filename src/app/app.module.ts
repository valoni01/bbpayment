import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/http-request.interceptor';
import { AppComponent } from './app.component';
import { TransactionsModule } from './components/transactions/transactions.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from './shared/external-lib/recruitment-fe-assignment-main/bb-ui/bb-ui.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TransactionsModule,
    BbUIModule,


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
