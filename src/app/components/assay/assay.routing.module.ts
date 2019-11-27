
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayComponent } from './assay.component';


const routes: Routes = [
  {
    path: '',
    component: AssayComponent,
  },
  {
      path: 'add-assay-data-according-to-arithmetic-coefficient', loadChildren: './components/add-assay-data-according-to-arithmetic-coefficient/add-assay-data-according-to-arithmetic-coefficient.module#AddAssayDataAccordingToArithmeticCoefficientModule',
      data: {
        moduleName: 'AddAssayDataAccordingToArithmeticCoefficient'
      },
  },
  
  {
      path: 'indexation-opening', loadChildren: './components/indexation-opening/indexation-opening.module#IndexationOpeningModule',
      data: {
        moduleName: 'IndexationOpening'
      },
  },
  
  {
      path: 'add-extensions-on-construction-plan', loadChildren: './components/add-extensions-on-construction-plan/add-extensions-on-construction-plan.module#AddExtensionsOnConstructionPlanModule',
      data: {
        moduleName: 'AddExtensionsOnConstructionPlan'
      },
  },
  
  {
      path: 'memoirs-of-transgression', loadChildren: './components/memoirs-of-transgression/memoirs-of-transgression.module#MemoirsOfTransgressionModule',
      data: {
        moduleName: 'MemoirsOfTransgression'
      },
  },
  
  {
      path: 'adjust-the-position-of-projects', loadChildren: './components/adjust-the-position-of-projects/adjust-the-position-of-projects.module#AdjustThePositionOfProjectsModule',
      data: {
        moduleName: 'AdjustThePositionOfProjects'
      },
  },
  
  {
      path: 'modify-the-prices-of-schools-for-pricing-2018', loadChildren: './components/modify-the-prices-of-schools-for-pricing-2018/modify-the-prices-of-schools-for-pricing-2018.module#ModifyThePricesOfSchoolsForPricing2018Module',
      data: {
        moduleName: 'ModifyThePricesOfSchoolsForPricing2018'
      },
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayRoutingModule {
}

