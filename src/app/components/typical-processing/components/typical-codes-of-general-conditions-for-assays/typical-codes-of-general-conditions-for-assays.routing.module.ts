import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalCodesOfGeneralConditionsForAssaysGuard } from './shared/typical-codes-of-general-conditions-for-assays.guard';
import { TypicalCodesOfGeneralConditionsForAssaysNewComponent } from './typical-codes-of-general-conditions-for-assays-new/typical-codes-of-general-conditions-for-assays-new.component';
import { TypicalCodesOfGeneralConditionsForAssaysEditComponent } from './typical-codes-of-general-conditions-for-assays-edit/typical-codes-of-general-conditions-for-assays-edit.component';
import { TypicalCodesOfGeneralConditionsForAssaysListComponent } from './typical-codes-of-general-conditions-for-assays-list/typical-codes-of-general-conditions-for-assays-list.component';
import { TypicalCodesOfGeneralConditionsForAssaysViewComponent } from './typical-codes-of-general-conditions-for-assays-view/typical-codes-of-general-conditions-for-assays-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalCodesOfGeneralConditionsForAssaysListComponent,
    canActivate: [TypicalCodesOfGeneralConditionsForAssaysGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalCodesOfGeneralConditionsForAssaysNewComponent,
    canActivate: [TypicalCodesOfGeneralConditionsForAssaysGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalCodesOfGeneralConditionsForAssaysEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalCodesOfGeneralConditionsForAssaysListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalCodesOfGeneralConditionsForAssaysViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalCodesOfGeneralConditionsForAssaysRoutingModule {
}
