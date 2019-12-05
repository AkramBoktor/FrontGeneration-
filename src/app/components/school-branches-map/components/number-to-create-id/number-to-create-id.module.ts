import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NumberToCreateIDListComponent } from './number-to-create-id-list/number-to-create-id-list.component';
import { NumberToCreateIDEditComponent } from './number-to-create-id-edit/number-to-create-id-edit.component';
import { NumberToCreateIDNewComponent } from './number-to-create-id-new/number-to-create-id-new.component';
import { NumberToCreateIDViewComponent } from './number-to-create-id-view/number-to-create-id-view.component';
import { NumberToCreateIDRoutingModule } from './number-to-create-id.routing.module';
import { NumberToCreateIDService } from './shared/number-to-create-id.service';
import { NumberToCreateIDGuard } from './shared/number-to-create-id.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NumberToCreateIDListComponent,
    NumberToCreateIDNewComponent,
    NumberToCreateIDEditComponent,
    NumberToCreateIDViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NumberToCreateIDRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NumberToCreateIDService,
    NumberToCreateIDGuard
  ],
  entryComponents: [
    NumberToCreateIDNewComponent,
    NumberToCreateIDEditComponent,
    NumberToCreateIDViewComponent
  ]
})

export class NumberToCreateIDModule {
}
