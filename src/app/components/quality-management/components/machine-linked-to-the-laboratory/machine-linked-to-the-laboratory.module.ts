import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MachineLinkedToTheLaboratoryListComponent } from './machine-linked-to-the-laboratory-list/machine-linked-to-the-laboratory-list.component';
import { MachineLinkedToTheLaboratoryEditComponent } from './machine-linked-to-the-laboratory-edit/machine-linked-to-the-laboratory-edit.component';
import { MachineLinkedToTheLaboratoryNewComponent } from './machine-linked-to-the-laboratory-new/machine-linked-to-the-laboratory-new.component';
import { MachineLinkedToTheLaboratoryViewComponent } from './machine-linked-to-the-laboratory-view/machine-linked-to-the-laboratory-view.component';
import { MachineLinkedToTheLaboratoryRoutingModule } from './machine-linked-to-the-laboratory.routing.module';
import { MachineLinkedToTheLaboratoryService } from './shared/machine-linked-to-the-laboratory.service';
import { MachineLinkedToTheLaboratoryGuard } from './shared/machine-linked-to-the-laboratory.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MachineLinkedToTheLaboratoryListComponent,
    MachineLinkedToTheLaboratoryNewComponent,
    MachineLinkedToTheLaboratoryEditComponent,
    MachineLinkedToTheLaboratoryViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MachineLinkedToTheLaboratoryRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MachineLinkedToTheLaboratoryService,
    MachineLinkedToTheLaboratoryGuard
  ],
  entryComponents: [
    MachineLinkedToTheLaboratoryNewComponent,
    MachineLinkedToTheLaboratoryEditComponent,
    MachineLinkedToTheLaboratoryViewComponent
  ]
})

export class MachineLinkedToTheLaboratoryModule {
}
