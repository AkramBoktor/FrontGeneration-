import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaNewComponent } from './area-new/area-new.component';
import { AreaViewComponent } from './area-view/area-view.component';
import { AreaRoutingModule } from './area.routing.module';
import { AreaService } from './shared/area.service';
import { AreaGuard } from './shared/area.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AreaListComponent,
    AreaNewComponent,
    AreaEditComponent,
    AreaViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AreaRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AreaService,
    AreaGuard
  ],
  entryComponents: [
    AreaNewComponent,
    AreaEditComponent,
    AreaViewComponent
  ]
})

export class AreaModule {
}
