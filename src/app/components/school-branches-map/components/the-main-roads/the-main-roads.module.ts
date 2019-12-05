import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheMainRoadsListComponent } from './the-main-roads-list/the-main-roads-list.component';
import { TheMainRoadsEditComponent } from './the-main-roads-edit/the-main-roads-edit.component';
import { TheMainRoadsNewComponent } from './the-main-roads-new/the-main-roads-new.component';
import { TheMainRoadsViewComponent } from './the-main-roads-view/the-main-roads-view.component';
import { TheMainRoadsRoutingModule } from './the-main-roads.routing.module';
import { TheMainRoadsService } from './shared/the-main-roads.service';
import { TheMainRoadsGuard } from './shared/the-main-roads.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheMainRoadsListComponent,
    TheMainRoadsNewComponent,
    TheMainRoadsEditComponent,
    TheMainRoadsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheMainRoadsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheMainRoadsService,
    TheMainRoadsGuard
  ],
  entryComponents: [
    TheMainRoadsNewComponent,
    TheMainRoadsEditComponent,
    TheMainRoadsViewComponent
  ]
})

export class TheMainRoadsModule {
}
