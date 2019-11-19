
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingInspectionAndValidityCertificateRoutingModule } from './building-inspection-and-validity-certificate.routing.module';
import { BuildingInspectionAndValidityCertificateComponent } from './building-inspection-and-validity-certificate.component';

@NgModule({
  declarations: [BuildingInspectionAndValidityCertificateComponent],
  imports: [
    BuildingInspectionAndValidityCertificateRoutingModule,
    CommonModule,
  ]
})
export class BuildingInspectionAndValidityCertificateModule { }

