import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InspectionFormListComponent } from './inspection-form-list/inspection-form-list.component';
import { InspectionFormEditComponent } from './inspection-form-edit/inspection-form-edit.component';
import { InspectionFormNewComponent } from './inspection-form-new/inspection-form-new.component';
import { InspectionFormViewComponent } from './inspection-form-view/inspection-form-view.component';
import { InspectionFormRoutingModule } from './inspection-form.routing.module';
import { InspectionFormService } from './shared/inspection-form.service';
import { InspectionFormGuard } from './shared/inspection-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InspectionFormListComponent,
    InspectionFormNewComponent,
    InspectionFormEditComponent,
    InspectionFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InspectionFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InspectionFormService,
    InspectionFormGuard
  ],
  entryComponents: [
    InspectionFormNewComponent,
    InspectionFormEditComponent,
    InspectionFormViewComponent
  ]
})

export class InspectionFormModule {
}
