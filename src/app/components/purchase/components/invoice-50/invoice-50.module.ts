import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { Invoice50ListComponent } from './invoice-50-list/invoice-50-list.component';
import { Invoice50EditComponent } from './invoice-50-edit/invoice-50-edit.component';
import { Invoice50NewComponent } from './invoice-50-new/invoice-50-new.component';
import { Invoice50ViewComponent } from './invoice-50-view/invoice-50-view.component';
import { Invoice50RoutingModule } from './invoice-50.routing.module';
import { Invoice50Service } from './shared/invoice-50.service';
import { Invoice50Guard } from './shared/invoice-50.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    Invoice50ListComponent,
    Invoice50NewComponent,
    Invoice50EditComponent,
    Invoice50ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    Invoice50RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    Invoice50Service,
    Invoice50Guard
  ],
  entryComponents: [
    Invoice50NewComponent,
    Invoice50EditComponent,
    Invoice50ViewComponent
  ]
})

export class Invoice50Module {
}
