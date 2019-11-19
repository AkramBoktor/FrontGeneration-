import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MultiFileUploadComponent } from './multi-file-upload.component';
import { MaterialControlsModule } from '../material-controls/material-controls.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialControlsModule,
        FileUploadModule
    ],
    declarations: [MultiFileUploadComponent],
    exports: [MultiFileUploadComponent]
})
export class MultiFileUploadModule { }
