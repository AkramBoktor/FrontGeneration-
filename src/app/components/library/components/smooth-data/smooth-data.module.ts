import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SmoothDataListComponent } from './smooth-data-list/smooth-data-list.component';
import { SmoothDataEditComponent } from './smooth-data-edit/smooth-data-edit.component';
import { SmoothDataNewComponent } from './smooth-data-new/smooth-data-new.component';
import { SmoothDataViewComponent } from './smooth-data-view/smooth-data-view.component';
import { SmoothDataRoutingModule } from './smooth-data.routing.module';
import { SmoothDataService } from './shared/smooth-data.service';
import { SmoothDataGuard } from './shared/smooth-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SmoothDataListComponent,
    SmoothDataNewComponent,
    SmoothDataEditComponent,
    SmoothDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SmoothDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SmoothDataService,
    SmoothDataGuard
  ],
  entryComponents: [
    SmoothDataNewComponent,
    SmoothDataEditComponent,
    SmoothDataViewComponent
  ]
})

export class SmoothDataModule {
}
