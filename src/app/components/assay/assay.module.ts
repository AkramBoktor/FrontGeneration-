
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayRoutingModule } from './assay.routing.module';
import { AssayComponent } from './assay.component';

@NgModule({
  declarations: [AssayComponent],
  imports: [
    AssayRoutingModule,
    CommonModule,
  ]
})
export class AssayModule { }

