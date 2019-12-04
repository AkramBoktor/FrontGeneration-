import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscribersDataInServicesAssociationListComponent } from './subscribers-data-in-services-association-list/subscribers-data-in-services-association-list.component';
import { SubscribersDataInServicesAssociationEditComponent } from './subscribers-data-in-services-association-edit/subscribers-data-in-services-association-edit.component';
import { SubscribersDataInServicesAssociationNewComponent } from './subscribers-data-in-services-association-new/subscribers-data-in-services-association-new.component';
import { SubscribersDataInServicesAssociationViewComponent } from './subscribers-data-in-services-association-view/subscribers-data-in-services-association-view.component';
import { SubscribersDataInServicesAssociationRoutingModule } from './subscribers-data-in-services-association.routing.module';
import { SubscribersDataInServicesAssociationService } from './shared/subscribers-data-in-services-association.service';
import { SubscribersDataInServicesAssociationGuard } from './shared/subscribers-data-in-services-association.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscribersDataInServicesAssociationListComponent,
    SubscribersDataInServicesAssociationNewComponent,
    SubscribersDataInServicesAssociationEditComponent,
    SubscribersDataInServicesAssociationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscribersDataInServicesAssociationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscribersDataInServicesAssociationService,
    SubscribersDataInServicesAssociationGuard
  ],
  entryComponents: [
    SubscribersDataInServicesAssociationNewComponent,
    SubscribersDataInServicesAssociationEditComponent,
    SubscribersDataInServicesAssociationViewComponent
  ]
})

export class SubscribersDataInServicesAssociationModule {
}
