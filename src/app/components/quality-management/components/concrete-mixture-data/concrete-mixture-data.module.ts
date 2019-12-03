import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ConcreteMixtureDataListComponent } from './concrete-mixture-data-list/concrete-mixture-data-list.component';
import { ConcreteMixtureDataEditComponent } from './concrete-mixture-data-edit/concrete-mixture-data-edit.component';
import { ConcreteMixtureDataNewComponent } from './concrete-mixture-data-new/concrete-mixture-data-new.component';
import { ConcreteMixtureDataViewComponent } from './concrete-mixture-data-view/concrete-mixture-data-view.component';
import { ConcreteMixtureDataRoutingModule } from './concrete-mixture-data.routing.module';
import { ConcreteMixtureDataService } from './shared/concrete-mixture-data.service';
import { ConcreteMixtureDataGuard } from './shared/concrete-mixture-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ConcreteMixtureDataListComponent,
    ConcreteMixtureDataNewComponent,
    ConcreteMixtureDataEditComponent,
    ConcreteMixtureDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ConcreteMixtureDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ConcreteMixtureDataService,
    ConcreteMixtureDataGuard
  ],
  entryComponents: [
    ConcreteMixtureDataNewComponent,
    ConcreteMixtureDataEditComponent,
    ConcreteMixtureDataViewComponent
  ]
})

export class ConcreteMixtureDataModule {
}
