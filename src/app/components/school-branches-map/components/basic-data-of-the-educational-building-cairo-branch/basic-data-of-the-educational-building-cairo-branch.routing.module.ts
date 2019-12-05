import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BasicDataOfTheEducationalBuildingCairoBranchGuard } from './shared/basic-data-of-the-educational-building-cairo-branch.guard';
import { BasicDataOfTheEducationalBuildingCairoBranchNewComponent } from './basic-data-of-the-educational-building-cairo-branch-new/basic-data-of-the-educational-building-cairo-branch-new.component';
import { BasicDataOfTheEducationalBuildingCairoBranchEditComponent } from './basic-data-of-the-educational-building-cairo-branch-edit/basic-data-of-the-educational-building-cairo-branch-edit.component';
import { BasicDataOfTheEducationalBuildingCairoBranchListComponent } from './basic-data-of-the-educational-building-cairo-branch-list/basic-data-of-the-educational-building-cairo-branch-list.component';
import { BasicDataOfTheEducationalBuildingCairoBranchViewComponent } from './basic-data-of-the-educational-building-cairo-branch-view/basic-data-of-the-educational-building-cairo-branch-view.component';

const routes: Routes = [
  {
    path: '',
    component: BasicDataOfTheEducationalBuildingCairoBranchListComponent,
    canActivate: [BasicDataOfTheEducationalBuildingCairoBranchGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BasicDataOfTheEducationalBuildingCairoBranchNewComponent,
    canActivate: [BasicDataOfTheEducationalBuildingCairoBranchGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BasicDataOfTheEducationalBuildingCairoBranchEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BasicDataOfTheEducationalBuildingCairoBranchListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BasicDataOfTheEducationalBuildingCairoBranchViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BasicDataOfTheEducationalBuildingCairoBranchRoutingModule {
}
