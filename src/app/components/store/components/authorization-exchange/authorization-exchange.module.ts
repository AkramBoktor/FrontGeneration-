import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AuthorizationExchangeListComponent } from './authorization-exchange-list/authorization-exchange-list.component';
import { AuthorizationExchangeEditComponent } from './authorization-exchange-edit/authorization-exchange-edit.component';
import { AuthorizationExchangeNewComponent } from './authorization-exchange-new/authorization-exchange-new.component';
import { AuthorizationExchangeViewComponent } from './authorization-exchange-view/authorization-exchange-view.component';
import { AuthorizationExchangeRoutingModule } from './authorization-exchange.routing.module';
import { AuthorizationExchangeService } from './shared/authorization-exchange.service';
import { AuthorizationExchangeGuard } from './shared/authorization-exchange.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AuthorizationExchangeListComponent,
    AuthorizationExchangeNewComponent,
    AuthorizationExchangeEditComponent,
    AuthorizationExchangeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AuthorizationExchangeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AuthorizationExchangeService,
    AuthorizationExchangeGuard
  ],
  entryComponents: [
    AuthorizationExchangeNewComponent,
    AuthorizationExchangeEditComponent,
    AuthorizationExchangeViewComponent
  ]
})

export class AuthorizationExchangeModule {
}
