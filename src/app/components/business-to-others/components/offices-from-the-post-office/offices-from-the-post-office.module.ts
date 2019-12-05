import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OfficesFromThePostOfficeListComponent } from './offices-from-the-post-office-list/offices-from-the-post-office-list.component';
import { OfficesFromThePostOfficeEditComponent } from './offices-from-the-post-office-edit/offices-from-the-post-office-edit.component';
import { OfficesFromThePostOfficeNewComponent } from './offices-from-the-post-office-new/offices-from-the-post-office-new.component';
import { OfficesFromThePostOfficeViewComponent } from './offices-from-the-post-office-view/offices-from-the-post-office-view.component';
import { OfficesFromThePostOfficeRoutingModule } from './offices-from-the-post-office.routing.module';
import { OfficesFromThePostOfficeService } from './shared/offices-from-the-post-office.service';
import { OfficesFromThePostOfficeGuard } from './shared/offices-from-the-post-office.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    OfficesFromThePostOfficeListComponent,
    OfficesFromThePostOfficeNewComponent,
    OfficesFromThePostOfficeEditComponent,
    OfficesFromThePostOfficeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OfficesFromThePostOfficeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OfficesFromThePostOfficeService,
    OfficesFromThePostOfficeGuard
  ],
  entryComponents: [
    OfficesFromThePostOfficeNewComponent,
    OfficesFromThePostOfficeEditComponent,
    OfficesFromThePostOfficeViewComponent
  ]
})

export class OfficesFromThePostOfficeModule {
}
