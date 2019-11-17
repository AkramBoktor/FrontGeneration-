import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LawsuitDataEditComponent } from './lawsuit-data-edit/lawsuit-data-edit.component';
import { LawsuitDataListComponent } from './lawsuit-data-list/lawsuit-data-list.component';
import { LawsuitDataNewComponent } from './lawsuit-data-new/lawsuit-data-new.component';
import { LawsuitDataViewComponent } from './lawsuit-data-view/lawsuit-data-view.component';
import { LawsuitDataRoutingModule } from './lawsuit-data.routing.module';
import { LawsuitDataGuard } from './shared/lawsuit-data.guard';
import { LawsuitDataService } from './shared/lawsuit-data.service';

@NgModule({
  declarations: [
    LawsuitDataListComponent,
    LawsuitDataNewComponent,
    LawsuitDataEditComponent,
    LawsuitDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LawsuitDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LawsuitDataService,
    LawsuitDataGuard
  ],
  entryComponents: [
    LawsuitDataNewComponent,
    LawsuitDataEditComponent,
    LawsuitDataViewComponent
  ]
})

export class LawsuitDataModule {
}
