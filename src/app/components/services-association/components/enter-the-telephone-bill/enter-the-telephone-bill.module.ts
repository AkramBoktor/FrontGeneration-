import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EnterTheTelephoneBillListComponent } from './enter-the-telephone-bill-list/enter-the-telephone-bill-list.component';
import { EnterTheTelephoneBillEditComponent } from './enter-the-telephone-bill-edit/enter-the-telephone-bill-edit.component';
import { EnterTheTelephoneBillNewComponent } from './enter-the-telephone-bill-new/enter-the-telephone-bill-new.component';
import { EnterTheTelephoneBillViewComponent } from './enter-the-telephone-bill-view/enter-the-telephone-bill-view.component';
import { EnterTheTelephoneBillRoutingModule } from './enter-the-telephone-bill.routing.module';
import { EnterTheTelephoneBillService } from './shared/enter-the-telephone-bill.service';
import { EnterTheTelephoneBillGuard } from './shared/enter-the-telephone-bill.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EnterTheTelephoneBillListComponent,
    EnterTheTelephoneBillNewComponent,
    EnterTheTelephoneBillEditComponent,
    EnterTheTelephoneBillViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EnterTheTelephoneBillRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EnterTheTelephoneBillService,
    EnterTheTelephoneBillGuard
  ],
  entryComponents: [
    EnterTheTelephoneBillNewComponent,
    EnterTheTelephoneBillEditComponent,
    EnterTheTelephoneBillViewComponent
  ]
})

export class EnterTheTelephoneBillModule {
}
