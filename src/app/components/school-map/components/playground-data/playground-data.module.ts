import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PlaygroundDataListComponent } from './playground-data-list/playground-data-list.component';
import { PlaygroundDataEditComponent } from './playground-data-edit/playground-data-edit.component';
import { PlaygroundDataNewComponent } from './playground-data-new/playground-data-new.component';
import { PlaygroundDataViewComponent } from './playground-data-view/playground-data-view.component';
import { PlaygroundDataRoutingModule } from './playground-data.routing.module';
import { PlaygroundDataService } from './shared/playground-data.service';
import { PlaygroundDataGuard } from './shared/playground-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PlaygroundDataListComponent,
    PlaygroundDataNewComponent,
    PlaygroundDataEditComponent,
    PlaygroundDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PlaygroundDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PlaygroundDataService,
    PlaygroundDataGuard
  ],
  entryComponents: [
    PlaygroundDataNewComponent,
    PlaygroundDataEditComponent,
    PlaygroundDataViewComponent
  ]
})

export class PlaygroundDataModule {
}
