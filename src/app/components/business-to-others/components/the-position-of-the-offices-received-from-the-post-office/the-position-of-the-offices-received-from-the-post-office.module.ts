import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent } from './the-position-of-the-offices-received-from-the-post-office-list/the-position-of-the-offices-received-from-the-post-office-list.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent } from './the-position-of-the-offices-received-from-the-post-office-edit/the-position-of-the-offices-received-from-the-post-office-edit.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent } from './the-position-of-the-offices-received-from-the-post-office-new/the-position-of-the-offices-received-from-the-post-office-new.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent } from './the-position-of-the-offices-received-from-the-post-office-view/the-position-of-the-offices-received-from-the-post-office-view.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeRoutingModule } from './the-position-of-the-offices-received-from-the-post-office.routing.module';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeService } from './shared/the-position-of-the-offices-received-from-the-post-office.service';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeGuard } from './shared/the-position-of-the-offices-received-from-the-post-office.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent,
    ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent,
    ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent,
    ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ThePositionOfTheOfficesReceivedFromThePostOfficeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ThePositionOfTheOfficesReceivedFromThePostOfficeService,
    ThePositionOfTheOfficesReceivedFromThePostOfficeGuard
  ],
  entryComponents: [
    ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent,
    ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent,
    ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent
  ]
})

export class ThePositionOfTheOfficesReceivedFromThePostOfficeModule {
}
