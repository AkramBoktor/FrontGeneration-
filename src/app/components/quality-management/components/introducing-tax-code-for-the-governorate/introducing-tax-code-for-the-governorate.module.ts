import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IntroducingTaxCodeForTheGovernorateListComponent } from './introducing-tax-code-for-the-governorate-list/introducing-tax-code-for-the-governorate-list.component';
import { IntroducingTaxCodeForTheGovernorateEditComponent } from './introducing-tax-code-for-the-governorate-edit/introducing-tax-code-for-the-governorate-edit.component';
import { IntroducingTaxCodeForTheGovernorateNewComponent } from './introducing-tax-code-for-the-governorate-new/introducing-tax-code-for-the-governorate-new.component';
import { IntroducingTaxCodeForTheGovernorateViewComponent } from './introducing-tax-code-for-the-governorate-view/introducing-tax-code-for-the-governorate-view.component';
import { IntroducingTaxCodeForTheGovernorateRoutingModule } from './introducing-tax-code-for-the-governorate.routing.module';
import { IntroducingTaxCodeForTheGovernorateService } from './shared/introducing-tax-code-for-the-governorate.service';
import { IntroducingTaxCodeForTheGovernorateGuard } from './shared/introducing-tax-code-for-the-governorate.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IntroducingTaxCodeForTheGovernorateListComponent,
    IntroducingTaxCodeForTheGovernorateNewComponent,
    IntroducingTaxCodeForTheGovernorateEditComponent,
    IntroducingTaxCodeForTheGovernorateViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IntroducingTaxCodeForTheGovernorateRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IntroducingTaxCodeForTheGovernorateService,
    IntroducingTaxCodeForTheGovernorateGuard
  ],
  entryComponents: [
    IntroducingTaxCodeForTheGovernorateNewComponent,
    IntroducingTaxCodeForTheGovernorateEditComponent,
    IntroducingTaxCodeForTheGovernorateViewComponent
  ]
})

export class IntroducingTaxCodeForTheGovernorateModule {
}
