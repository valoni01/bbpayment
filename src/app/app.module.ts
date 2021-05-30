import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
