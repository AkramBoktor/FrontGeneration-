import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesGuard } from './shared/registration-of-educational-buildings-used-for-general-purposes.guard';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent } from './registration-of-educational-buildings-used-for-general-purposes-new/registration-of-educational-buildings-used-for-general-purposes-new.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent } from './registration-of-educational-buildings-used-for-general-purposes-edit/registration-of-educational-buildings-used-for-general-purposes-edit.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent } from './registration-of-educational-buildings-used-for-general-purposes-list/registration-of-educational-buildings-used-for-general-purposes-list.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent } from './registration-of-educational-buildings-used-for-general-purposes-view/registration-of-educational-buildings-used-for-general-purposes-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent,
    canActivate: [RegistrationOfEducationalBuildingsUsedForGeneralPurposesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent,
    canActivate: [RegistrationOfEducationalBuildingsUsedForGeneralPurposesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesRoutingModule {
}
