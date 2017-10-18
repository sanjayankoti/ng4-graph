/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GraphModule } from 'ng4-graph';

@Component({
  selector: 'app',
  template: `<Graph-component></Graph-component>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, GraphModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
