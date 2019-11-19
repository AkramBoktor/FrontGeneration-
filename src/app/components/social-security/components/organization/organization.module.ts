import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationNewComponent } from './organization-new/organization-new.component';
import { OrganizationViewComponent } from './organization-view/organization-view.component';
import { OrganizationRoutingModule } from './organization.routing.module';
import { OrganizationService } from './shared/organization.service';
import { OrganizationGuard } from './shared/organization.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationNewComponent,
    OrganizationEditComponent,
    OrganizationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OrganizationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OrganizationService,
    OrganizationGuard
  ],
  entryComponents: [
    OrganizationNewComponent,
    OrganizationEditComponent,
    OrganizationViewComponent
  ]
})

export class OrganizationModule {
}
