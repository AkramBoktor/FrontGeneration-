import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BuildingValidityCertificateListComponent } from './building-validity-certificate-list/building-validity-certificate-list.component';
import { BuildingValidityCertificateEditComponent } from './building-validity-certificate-edit/building-validity-certificate-edit.component';
import { BuildingValidityCertificateNewComponent } from './building-validity-certificate-new/building-validity-certificate-new.component';
import { BuildingValidityCertificateViewComponent } from './building-validity-certificate-view/building-validity-certificate-view.component';
import { BuildingValidityCertificateRoutingModule } from './building-validity-certificate.routing.module';
import { BuildingValidityCertificateService } from './shared/building-validity-certificate.service';
import { BuildingValidityCertificateGuard } from './shared/building-validity-certificate.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BuildingValidityCertificateListComponent,
    BuildingValidityCertificateNewComponent,
    BuildingValidityCertificateEditComponent,
    BuildingValidityCertificateViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BuildingValidityCertificateRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BuildingValidityCertificateService,
    BuildingValidityCertificateGuard
  ],
  entryComponents: [
    BuildingValidityCertificateNewComponent,
    BuildingValidityCertificateEditComponent,
    BuildingValidityCertificateViewComponent
  ]
})

export class BuildingValidityCertificateModule {
}
