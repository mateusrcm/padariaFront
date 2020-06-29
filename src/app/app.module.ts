import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";

import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzMessageModule } from "ng-zorro-antd/message";

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    NzPopconfirmModule,
    BrowserModule,
    NzTableModule,
    NzMessageModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzGridModule,
    NzDividerModule,
    AppRoutingModule,
    NzModalModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
