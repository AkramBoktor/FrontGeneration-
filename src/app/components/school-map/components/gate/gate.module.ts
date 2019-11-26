import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GateListComponent } from './gate-list/gate-list.component';
import { GateEditComponent } from './gate-edit/gate-edit.component';
import { GateNewComponent } from './gate-new/gate-new.component';
import { GateViewComponent } from './gate-view/gate-view.component';
import { GateRoutingModule } from './gate.routing.module';
import { GateService } from './shared/gate.service';
import { GateGuard } from './shared/gate.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GateListComponent,
    GateNewComponent,
    GateEditComponent,
    GateViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GateRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GateService,
    GateGuard
  ],
  entryComponents: [
    GateNewComponent,
    GateEditComponent,
    GateViewComponent
  ]
})

export class GateModule {
}
