import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RequiredServicesListComponent } from './required-services-list/required-services-list.component';
import { RequiredServicesEditComponent } from './required-services-edit/required-services-edit.component';
import { RequiredServicesNewComponent } from './required-services-new/required-services-new.component';
import { RequiredServicesViewComponent } from './required-services-view/required-services-view.component';
import { RequiredServicesRoutingModule } from './required-services.routing.module';
import { RequiredServicesService } from './shared/required-services.service';
import { RequiredServicesGuard } from './shared/required-services.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RequiredServicesListComponent,
    RequiredServicesNewComponent,
    RequiredServicesEditComponent,
    RequiredServicesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RequiredServicesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RequiredServicesService,
    RequiredServicesGuard
  ],
  entryComponents: [
    RequiredServicesNewComponent,
    RequiredServicesEditComponent,
    RequiredServicesViewComponent
  ]
})

export class RequiredServicesModule {
}
