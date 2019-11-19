import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ChairmanVisaListComponent } from './chairman-visa-list/chairman-visa-list.component';
import { ChairmanVisaEditComponent } from './chairman-visa-edit/chairman-visa-edit.component';
import { ChairmanVisaNewComponent } from './chairman-visa-new/chairman-visa-new.component';
import { ChairmanVisaViewComponent } from './chairman-visa-view/chairman-visa-view.component';
import { ChairmanVisaRoutingModule } from './chairman-visa.routing.module';
import { ChairmanVisaService } from './shared/chairman-visa.service';
import { ChairmanVisaGuard } from './shared/chairman-visa.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ChairmanVisaListComponent,
    ChairmanVisaNewComponent,
    ChairmanVisaEditComponent,
    ChairmanVisaViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ChairmanVisaRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ChairmanVisaService,
    ChairmanVisaGuard
  ],
  entryComponents: [
    ChairmanVisaNewComponent,
    ChairmanVisaEditComponent,
    ChairmanVisaViewComponent
  ]
})

export class ChairmanVisaModule {
}
