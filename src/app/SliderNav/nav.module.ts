import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  exports: [NavComponent],
  imports: [
  ],
  providers: [],
  bootstrap: [NavComponent]
})
export class NavModule { }
