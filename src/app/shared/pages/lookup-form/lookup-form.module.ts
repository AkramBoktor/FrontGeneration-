import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LookupEditComponent } from './lookup-edit/lookup-edit.component';
import { LookupFormRoutingModule } from './lookup-form.routing.module';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { LookupNewComponent } from './lookup-new/lookup-new.component';
import { LookupViewComponent } from './lookup-view/lookup-view.component';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { MaterialDialogService } from 'app/shared/components/material-controls/material-dialog.service';

@NgModule({
  declarations: [LookupNewComponent, LookupEditComponent, LookupListComponent, LookupViewComponent],
  imports: [
    LookupFormRoutingModule,
    MaterialControlsModule,
    GridControlModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule,
    CommonPipesModule,
    CommonModule
  ],
  entryComponents: [
    LookupNewComponent,
    LookupEditComponent,
    LookupViewComponent
  ],
  providers: [MaterialDialogService]
})
export class LookupFormModule { }
