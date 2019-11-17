import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridControlComponent } from './grid-control.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';
import { MaterialControlsModule } from '../material-controls/material-controls.module';
import { MaterialDialogComponent } from '../material-controls/material-dialog/material-dialog.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialControlsModule,
    AgGridModule.withComponents([]),
    SharedDirectivesModule
  ],
  exports: [
    GridControlComponent
  ],
  declarations: [GridControlComponent, GridActionButtonsComponent],
  entryComponents: [GridActionButtonsComponent, MaterialDialogComponent]
})
export class GridControlModule { }
