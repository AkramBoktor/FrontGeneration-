
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayListSubsystemCodeRoutingModule } from './assay-list-subsystem-code.routing.module';
import { AssayListSubsystemCodeComponent } from './assay-list-subsystem-code.component';

@NgModule({
  declarations: [AssayListSubsystemCodeComponent],
  imports: [
    AssayListSubsystemCodeRoutingModule,
    CommonModule,
  ]
})
export class AssayListSubsystemCodeModule { }

