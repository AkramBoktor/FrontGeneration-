import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LevelListComponent } from './level-list/level-list.component';
import { LevelEditComponent } from './level-edit/level-edit.component';
import { LevelNewComponent } from './level-new/level-new.component';
import { LevelViewComponent } from './level-view/level-view.component';
import { LevelRoutingModule } from './level.routing.module';
import { LevelService } from './shared/level.service';
import { LevelGuard } from './shared/level.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LevelListComponent,
    LevelNewComponent,
    LevelEditComponent,
    LevelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LevelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LevelService,
    LevelGuard
  ],
  entryComponents: [
    LevelNewComponent,
    LevelEditComponent,
    LevelViewComponent
  ]
})

export class LevelModule {
}
