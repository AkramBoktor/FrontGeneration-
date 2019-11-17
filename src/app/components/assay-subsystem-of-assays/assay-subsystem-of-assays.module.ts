
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssaySubsystemOfAssaysRoutingModule } from './assay-subsystem-of-assays.routing.module';
import { AssaySubsystemOfAssaysComponent } from './assay-subsystem-of-assays.component';

@NgModule({
  declarations: [AssaySubsystemOfAssaysComponent],
  imports: [
    AssaySubsystemOfAssaysRoutingModule,
    CommonModule,
  ]
})
export class AssaySubsystemOfAssaysModule { }

