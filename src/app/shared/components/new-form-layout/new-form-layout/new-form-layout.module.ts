import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { MaterialControlsModule } from '../../material-controls/material-controls.module';
import { NewFormContainerDirective } from './new-form-container.directive';
import { NewFormLayoutComponent } from './new-form-layout.component';




@NgModule({
    imports: [
        CommonModule,
        MaterialControlsModule,
        SharedDirectivesModule
    ],
    exports: [NewFormLayoutComponent, NewFormContainerDirective],
    declarations: [NewFormLayoutComponent, NewFormContainerDirective]
})
export class NewFormLayoutModule { }

