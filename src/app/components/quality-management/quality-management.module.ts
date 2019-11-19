
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityManagementRoutingModule } from './quality-management.routing.module';
import { QualityManagementComponent } from './quality-management.component';

@NgModule({
  declarations: [QualityManagementComponent],
  imports: [
    QualityManagementRoutingModule,
    CommonModule,
  ]
})
export class QualityManagementModule { }

