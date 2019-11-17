
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayWorkOfCloudsAssaysRoutingModule } from './assay-work-of-clouds-assays.routing.module';
import { AssayWorkOfCloudsAssaysComponent } from './assay-work-of-clouds-assays.component';

@NgModule({
  declarations: [AssayWorkOfCloudsAssaysComponent],
  imports: [
    AssayWorkOfCloudsAssaysRoutingModule,
    CommonModule,
  ]
})
export class AssayWorkOfCloudsAssaysModule { }

