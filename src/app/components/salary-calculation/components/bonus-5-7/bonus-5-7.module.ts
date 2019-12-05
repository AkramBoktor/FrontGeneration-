import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { Bonus57ListComponent } from './bonus-5-7-list/bonus-5-7-list.component';
import { Bonus57EditComponent } from './bonus-5-7-edit/bonus-5-7-edit.component';
import { Bonus57NewComponent } from './bonus-5-7-new/bonus-5-7-new.component';
import { Bonus57ViewComponent } from './bonus-5-7-view/bonus-5-7-view.component';
import { Bonus57RoutingModule } from './bonus-5-7.routing.module';
import { Bonus57Service } from './shared/bonus-5-7.service';
import { Bonus57Guard } from './shared/bonus-5-7.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    Bonus57ListComponent,
    Bonus57NewComponent,
    Bonus57EditComponent,
    Bonus57ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    Bonus57RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    Bonus57Service,
    Bonus57Guard
  ],
  entryComponents: [
    Bonus57NewComponent,
    Bonus57EditComponent,
    Bonus57ViewComponent
  ]
})

export class Bonus57Module {
}
