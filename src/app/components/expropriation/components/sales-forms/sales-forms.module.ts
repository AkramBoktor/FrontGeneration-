import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SalesFormsListComponent } from './sales-forms-list/sales-forms-list.component';
import { SalesFormsEditComponent } from './sales-forms-edit/sales-forms-edit.component';
import { SalesFormsNewComponent } from './sales-forms-new/sales-forms-new.component';
import { SalesFormsViewComponent } from './sales-forms-view/sales-forms-view.component';
import { SalesFormsRoutingModule } from './sales-forms.routing.module';
import { SalesFormsService } from './shared/sales-forms.service';
import { SalesFormsGuard } from './shared/sales-forms.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SalesFormsListComponent,
    SalesFormsNewComponent,
    SalesFormsEditComponent,
    SalesFormsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SalesFormsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SalesFormsService,
    SalesFormsGuard
  ],
  entryComponents: [
    SalesFormsNewComponent,
    SalesFormsEditComponent,
    SalesFormsViewComponent
  ]
})

export class SalesFormsModule {
}
