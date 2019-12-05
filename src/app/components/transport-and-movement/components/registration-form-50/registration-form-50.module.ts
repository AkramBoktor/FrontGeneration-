import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegistrationForm50ListComponent } from './registration-form-50-list/registration-form-50-list.component';
import { RegistrationForm50EditComponent } from './registration-form-50-edit/registration-form-50-edit.component';
import { RegistrationForm50NewComponent } from './registration-form-50-new/registration-form-50-new.component';
import { RegistrationForm50ViewComponent } from './registration-form-50-view/registration-form-50-view.component';
import { RegistrationForm50RoutingModule } from './registration-form-50.routing.module';
import { RegistrationForm50Service } from './shared/registration-form-50.service';
import { RegistrationForm50Guard } from './shared/registration-form-50.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegistrationForm50ListComponent,
    RegistrationForm50NewComponent,
    RegistrationForm50EditComponent,
    RegistrationForm50ViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegistrationForm50RoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegistrationForm50Service,
    RegistrationForm50Guard
  ],
  entryComponents: [
    RegistrationForm50NewComponent,
    RegistrationForm50EditComponent,
    RegistrationForm50ViewComponent
  ]
})

export class RegistrationForm50Module {
}
