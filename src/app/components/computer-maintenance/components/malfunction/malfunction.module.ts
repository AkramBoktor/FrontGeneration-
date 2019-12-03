import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MalfunctionListComponent } from './malfunction-list/malfunction-list.component';
import { MalfunctionEditComponent } from './malfunction-edit/malfunction-edit.component';
import { MalfunctionNewComponent } from './malfunction-new/malfunction-new.component';
import { MalfunctionViewComponent } from './malfunction-view/malfunction-view.component';
import { MalfunctionRoutingModule } from './malfunction.routing.module';
import { MalfunctionService } from './shared/malfunction.service';
import { MalfunctionGuard } from './shared/malfunction.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MalfunctionListComponent,
    MalfunctionNewComponent,
    MalfunctionEditComponent,
    MalfunctionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MalfunctionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MalfunctionService,
    MalfunctionGuard
  ],
  entryComponents: [
    MalfunctionNewComponent,
    MalfunctionEditComponent,
    MalfunctionViewComponent
  ]
})

export class MalfunctionModule {
}
