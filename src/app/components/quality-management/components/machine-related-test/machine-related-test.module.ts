import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MachineRelatedTestListComponent } from './machine-related-test-list/machine-related-test-list.component';
import { MachineRelatedTestEditComponent } from './machine-related-test-edit/machine-related-test-edit.component';
import { MachineRelatedTestNewComponent } from './machine-related-test-new/machine-related-test-new.component';
import { MachineRelatedTestViewComponent } from './machine-related-test-view/machine-related-test-view.component';
import { MachineRelatedTestRoutingModule } from './machine-related-test.routing.module';
import { MachineRelatedTestService } from './shared/machine-related-test.service';
import { MachineRelatedTestGuard } from './shared/machine-related-test.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MachineRelatedTestListComponent,
    MachineRelatedTestNewComponent,
    MachineRelatedTestEditComponent,
    MachineRelatedTestViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MachineRelatedTestRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MachineRelatedTestService,
    MachineRelatedTestGuard
  ],
  entryComponents: [
    MachineRelatedTestNewComponent,
    MachineRelatedTestEditComponent,
    MachineRelatedTestViewComponent
  ]
})

export class MachineRelatedTestModule {
}
