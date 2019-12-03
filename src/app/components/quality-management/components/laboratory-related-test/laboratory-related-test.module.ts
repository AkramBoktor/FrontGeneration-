import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LaboratoryRelatedTestListComponent } from './laboratory-related-test-list/laboratory-related-test-list.component';
import { LaboratoryRelatedTestEditComponent } from './laboratory-related-test-edit/laboratory-related-test-edit.component';
import { LaboratoryRelatedTestNewComponent } from './laboratory-related-test-new/laboratory-related-test-new.component';
import { LaboratoryRelatedTestViewComponent } from './laboratory-related-test-view/laboratory-related-test-view.component';
import { LaboratoryRelatedTestRoutingModule } from './laboratory-related-test.routing.module';
import { LaboratoryRelatedTestService } from './shared/laboratory-related-test.service';
import { LaboratoryRelatedTestGuard } from './shared/laboratory-related-test.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LaboratoryRelatedTestListComponent,
    LaboratoryRelatedTestNewComponent,
    LaboratoryRelatedTestEditComponent,
    LaboratoryRelatedTestViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LaboratoryRelatedTestRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LaboratoryRelatedTestService,
    LaboratoryRelatedTestGuard
  ],
  entryComponents: [
    LaboratoryRelatedTestNewComponent,
    LaboratoryRelatedTestEditComponent,
    LaboratoryRelatedTestViewComponent
  ]
})

export class LaboratoryRelatedTestModule {
}
