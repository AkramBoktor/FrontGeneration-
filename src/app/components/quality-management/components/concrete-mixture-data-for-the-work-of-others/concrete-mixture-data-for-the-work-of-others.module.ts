import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ConcreteMixtureDataForTheWorkOfOthersListComponent } from './concrete-mixture-data-for-the-work-of-others-list/concrete-mixture-data-for-the-work-of-others-list.component';
import { ConcreteMixtureDataForTheWorkOfOthersEditComponent } from './concrete-mixture-data-for-the-work-of-others-edit/concrete-mixture-data-for-the-work-of-others-edit.component';
import { ConcreteMixtureDataForTheWorkOfOthersNewComponent } from './concrete-mixture-data-for-the-work-of-others-new/concrete-mixture-data-for-the-work-of-others-new.component';
import { ConcreteMixtureDataForTheWorkOfOthersViewComponent } from './concrete-mixture-data-for-the-work-of-others-view/concrete-mixture-data-for-the-work-of-others-view.component';
import { ConcreteMixtureDataForTheWorkOfOthersRoutingModule } from './concrete-mixture-data-for-the-work-of-others.routing.module';
import { ConcreteMixtureDataForTheWorkOfOthersService } from './shared/concrete-mixture-data-for-the-work-of-others.service';
import { ConcreteMixtureDataForTheWorkOfOthersGuard } from './shared/concrete-mixture-data-for-the-work-of-others.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ConcreteMixtureDataForTheWorkOfOthersListComponent,
    ConcreteMixtureDataForTheWorkOfOthersNewComponent,
    ConcreteMixtureDataForTheWorkOfOthersEditComponent,
    ConcreteMixtureDataForTheWorkOfOthersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ConcreteMixtureDataForTheWorkOfOthersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ConcreteMixtureDataForTheWorkOfOthersService,
    ConcreteMixtureDataForTheWorkOfOthersGuard
  ],
  entryComponents: [
    ConcreteMixtureDataForTheWorkOfOthersNewComponent,
    ConcreteMixtureDataForTheWorkOfOthersEditComponent,
    ConcreteMixtureDataForTheWorkOfOthersViewComponent
  ]
})

export class ConcreteMixtureDataForTheWorkOfOthersModule {
}
