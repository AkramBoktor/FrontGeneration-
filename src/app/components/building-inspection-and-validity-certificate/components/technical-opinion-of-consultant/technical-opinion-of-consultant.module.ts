import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TechnicalOpinionOfConsultantListComponent } from './technical-opinion-of-consultant-list/technical-opinion-of-consultant-list.component';
import { TechnicalOpinionOfConsultantEditComponent } from './technical-opinion-of-consultant-edit/technical-opinion-of-consultant-edit.component';
import { TechnicalOpinionOfConsultantNewComponent } from './technical-opinion-of-consultant-new/technical-opinion-of-consultant-new.component';
import { TechnicalOpinionOfConsultantViewComponent } from './technical-opinion-of-consultant-view/technical-opinion-of-consultant-view.component';
import { TechnicalOpinionOfConsultantRoutingModule } from './technical-opinion-of-consultant.routing.module';
import { TechnicalOpinionOfConsultantService } from './shared/technical-opinion-of-consultant.service';
import { TechnicalOpinionOfConsultantGuard } from './shared/technical-opinion-of-consultant.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TechnicalOpinionOfConsultantListComponent,
    TechnicalOpinionOfConsultantNewComponent,
    TechnicalOpinionOfConsultantEditComponent,
    TechnicalOpinionOfConsultantViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TechnicalOpinionOfConsultantRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TechnicalOpinionOfConsultantService,
    TechnicalOpinionOfConsultantGuard
  ],
  entryComponents: [
    TechnicalOpinionOfConsultantNewComponent,
    TechnicalOpinionOfConsultantEditComponent,
    TechnicalOpinionOfConsultantViewComponent
  ]
})

export class TechnicalOpinionOfConsultantModule {
}
