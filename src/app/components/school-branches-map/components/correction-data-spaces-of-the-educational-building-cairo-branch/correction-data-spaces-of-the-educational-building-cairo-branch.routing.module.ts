import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchGuard } from './shared/correction-data-spaces-of-the-educational-building-cairo-branch.guard';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-new/correction-data-spaces-of-the-educational-building-cairo-branch-new.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-edit/correction-data-spaces-of-the-educational-building-cairo-branch-edit.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-list/correction-data-spaces-of-the-educational-building-cairo-branch-list.component';
import { CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent } from './correction-data-spaces-of-the-educational-building-cairo-branch-view/correction-data-spaces-of-the-educational-building-cairo-branch-view.component';

const routes: Routes = [
  {
    path: '',
    component: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent,
    canActivate: [CorrectionDataSpacesOfTheEducationalBuildingCairoBranchGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchNewComponent,
    canActivate: [CorrectionDataSpacesOfTheEducationalBuildingCairoBranchGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CorrectionDataSpacesOfTheEducationalBuildingCairoBranchViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CorrectionDataSpacesOfTheEducationalBuildingCairoBranchRoutingModule {
}
