import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideIfUnauthorizedDirective, DisableIfUnauthorizedDirective } from './';
import { DisableControlDirective } from './disable-control.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    HideIfUnauthorizedDirective,
    DisableIfUnauthorizedDirective,
    DisableControlDirective
  ],
  declarations: [HideIfUnauthorizedDirective, DisableIfUnauthorizedDirective, DisableControlDirective, DisableControlDirective],
})
export class SharedDirectivesModule { }
