import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph.component';
import { GraphDirective } from './graph.directive';
import { GraphPipe } from './graph.pipe';
import { GraphService } from './graph.service';

export * from './graph.component';
export * from './graph.directive';
export * from './graph.pipe';
export * from './graph.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GraphComponent
  ],
  exports: [
    GraphComponent
  ]
})
export class Ng4GraphModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng4GraphModule,
      providers: []
    };
  }
}
