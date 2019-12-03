import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LaboratorySpaceListComponent } from './laboratory-space-list/laboratory-space-list.component';
import { LaboratorySpaceEditComponent } from './laboratory-space-edit/laboratory-space-edit.component';
import { LaboratorySpaceNewComponent } from './laboratory-space-new/laboratory-space-new.component';
import { LaboratorySpaceViewComponent } from './laboratory-space-view/laboratory-space-view.component';
import { LaboratorySpaceRoutingModule } from './laboratory-space.routing.module';
import { LaboratorySpaceService } from './shared/laboratory-space.service';
import { LaboratorySpaceGuard } from './shared/laboratory-space.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LaboratorySpaceListComponent,
    LaboratorySpaceNewComponent,
    LaboratorySpaceEditComponent,
    LaboratorySpaceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LaboratorySpaceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LaboratorySpaceService,
    LaboratorySpaceGuard
  ],
  entryComponents: [
    LaboratorySpaceNewComponent,
    LaboratorySpaceEditComponent,
    LaboratorySpaceViewComponent
  ]
})

export class LaboratorySpaceModule {
}
