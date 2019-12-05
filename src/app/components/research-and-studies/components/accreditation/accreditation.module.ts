import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AccreditationListComponent } from './accreditation-list/accreditation-list.component';
import { AccreditationEditComponent } from './accreditation-edit/accreditation-edit.component';
import { AccreditationNewComponent } from './accreditation-new/accreditation-new.component';
import { AccreditationViewComponent } from './accreditation-view/accreditation-view.component';
import { AccreditationRoutingModule } from './accreditation.routing.module';
import { AccreditationService } from './shared/accreditation.service';
import { AccreditationGuard } from './shared/accreditation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AccreditationListComponent,
    AccreditationNewComponent,
    AccreditationEditComponent,
    AccreditationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AccreditationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AccreditationService,
    AccreditationGuard
  ],
  entryComponents: [
    AccreditationNewComponent,
    AccreditationEditComponent,
    AccreditationViewComponent
  ]
})

export class AccreditationModule {
}
