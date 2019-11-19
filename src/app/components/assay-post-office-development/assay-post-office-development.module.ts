
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayPostOfficeDevelopmentRoutingModule } from './assay-post-office-development.routing.module';
import { AssayPostOfficeDevelopmentComponent } from './assay-post-office-development.component';

@NgModule({
  declarations: [AssayPostOfficeDevelopmentComponent],
  imports: [
    AssayPostOfficeDevelopmentRoutingModule,
    CommonModule,
  ]
})
export class AssayPostOfficeDevelopmentModule { }

