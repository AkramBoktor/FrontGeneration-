import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RetirementEditComponent } from './retirement-edit/retirement-edit.component';
import { RetirementListComponent } from './retirement-list/retirement-list.component';
import { RetirementNewComponent } from './retirement-new/retirement-new.component';
import { RetirementViewComponent } from './retirement-view/retirement-view.component';
import { RetirementRoutingModule } from './retirement.routing.module';
import { RetirementGuard } from './shared/retirement.guard';
import { RetirementService } from './shared/retirement.service';

@NgModule({
  declarations: [
    RetirementListComponent,
    RetirementNewComponent,
    RetirementEditComponent,
    RetirementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RetirementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RetirementService,
    RetirementGuard
  ],
  entryComponents: [
    RetirementNewComponent,
    RetirementEditComponent,
    RetirementViewComponent
  ]
})

export class RetirementModule {
}
