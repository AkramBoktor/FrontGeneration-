import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheListsRequiredToEquipAllSchoolsGuard } from './shared/the-lists-required-to-equip-all-schools.guard';
import { TheListsRequiredToEquipAllSchoolsNewComponent } from './the-lists-required-to-equip-all-schools-new/the-lists-required-to-equip-all-schools-new.component';
import { TheListsRequiredToEquipAllSchoolsEditComponent } from './the-lists-required-to-equip-all-schools-edit/the-lists-required-to-equip-all-schools-edit.component';
import { TheListsRequiredToEquipAllSchoolsListComponent } from './the-lists-required-to-equip-all-schools-list/the-lists-required-to-equip-all-schools-list.component';
import { TheListsRequiredToEquipAllSchoolsViewComponent } from './the-lists-required-to-equip-all-schools-view/the-lists-required-to-equip-all-schools-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheListsRequiredToEquipAllSchoolsListComponent,
    canActivate: [TheListsRequiredToEquipAllSchoolsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheListsRequiredToEquipAllSchoolsNewComponent,
    canActivate: [TheListsRequiredToEquipAllSchoolsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheListsRequiredToEquipAllSchoolsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheListsRequiredToEquipAllSchoolsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheListsRequiredToEquipAllSchoolsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheListsRequiredToEquipAllSchoolsRoutingModule {
}
