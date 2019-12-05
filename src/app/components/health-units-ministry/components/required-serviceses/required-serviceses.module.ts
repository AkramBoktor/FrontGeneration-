import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RequiredServicesesListComponent } from './required-serviceses-list/required-serviceses-list.component';
import { RequiredServicesesEditComponent } from './required-serviceses-edit/required-serviceses-edit.component';
import { RequiredServicesesNewComponent } from './required-serviceses-new/required-serviceses-new.component';
import { RequiredServicesesViewComponent } from './required-serviceses-view/required-serviceses-view.component';
import { RequiredServicesesRoutingModule } from './required-serviceses.routing.module';
import { RequiredServicesesService } from './shared/required-serviceses.service';
import { RequiredServicesesGuard } from './shared/required-serviceses.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RequiredServicesesListComponent,
    RequiredServicesesNewComponent,
    RequiredServicesesEditComponent,
    RequiredServicesesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RequiredServicesesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RequiredServicesesService,
    RequiredServicesesGuard
  ],
  entryComponents: [
    RequiredServicesesNewComponent,
    RequiredServicesesEditComponent,
    RequiredServicesesViewComponent
  ]
})

export class RequiredServicesesModule {
}
