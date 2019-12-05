import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExchangeFormListComponent } from './exchange-form-list/exchange-form-list.component';
import { ExchangeFormEditComponent } from './exchange-form-edit/exchange-form-edit.component';
import { ExchangeFormNewComponent } from './exchange-form-new/exchange-form-new.component';
import { ExchangeFormViewComponent } from './exchange-form-view/exchange-form-view.component';
import { ExchangeFormRoutingModule } from './exchange-form.routing.module';
import { ExchangeFormService } from './shared/exchange-form.service';
import { ExchangeFormGuard } from './shared/exchange-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExchangeFormListComponent,
    ExchangeFormNewComponent,
    ExchangeFormEditComponent,
    ExchangeFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExchangeFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExchangeFormService,
    ExchangeFormGuard
  ],
  entryComponents: [
    ExchangeFormNewComponent,
    ExchangeFormEditComponent,
    ExchangeFormViewComponent
  ]
})

export class ExchangeFormModule {
}
