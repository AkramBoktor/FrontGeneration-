import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-list/conformations-and-the-result-of-the-corresponding-concrete-mixture-list.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-edit/conformations-and-the-result-of-the-corresponding-concrete-mixture-edit.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-new/conformations-and-the-result-of-the-corresponding-concrete-mixture-new.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-view/conformations-and-the-result-of-the-corresponding-concrete-mixture-view.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureRoutingModule } from './conformations-and-the-result-of-the-corresponding-concrete-mixture.routing.module';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService } from './shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.service';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureGuard } from './shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureGuard
  ],
  entryComponents: [
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent,
    ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent
  ]
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureModule {
}
