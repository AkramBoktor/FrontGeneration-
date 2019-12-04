
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalProcessingComponent } from './typical-processing.component';


const routes: Routes = [
  {
    path: '',
    component: TypicalProcessingComponent,
  },
  


{
    path: 'typical-form-a-disbursement-form', loadChildren: './components/typical-form-a-disbursement-form/typical-form-a-disbursement-form.module#TypicalFormADisbursementFormModule',
    data: {
      moduleName: 'TypicalFormADisbursementForm'
    },
},

{
    path: 'typical-issuing-a-supply-order', loadChildren: './components/typical-issuing-a-supply-order/typical-issuing-a-supply-order.module#TypicalIssuingASupplyOrderModule',
    data: {
      moduleName: 'TypicalIssuingASupplyOrder'
    },
},

{
    path: 'typical-items-of-assay-lists', loadChildren: './components/typical-items-of-assay-lists/typical-items-of-assay-lists.module#TypicalItemsOfAssayListsModule',
    data: {
      moduleName: 'TypicalItemsOfAssayLists'
    },
},

{
    path: 'typical-assay-data', loadChildren: './components/typical-assay-data/typical-assay-data.module#TypicalAssayDataModule',
    data: {
      moduleName: 'TypicalAssayData'
    },
},

{
    path: 'typical-assay-lists', loadChildren: './components/typical-assay-lists/typical-assay-lists.module#TypicalAssayListsModule',
    data: {
      moduleName: 'TypicalAssayLists'
    },
},

{
    path: 'typical-codes-of-general-conditions-for-assays', loadChildren: './components/typical-codes-of-general-conditions-for-assays/typical-codes-of-general-conditions-for-assays.module#TypicalCodesOfGeneralConditionsForAssaysModule',
    data: {
      moduleName: 'TypicalCodesOfGeneralConditionsForAssays'
    },
},

{
    path: 'typical-delivery-date-for-a-supply-order', loadChildren: './components/typical-delivery-date-for-a-supply-order/typical-delivery-date-for-a-supply-order.module#TypicalDeliveryDateForASupplyOrderModule',
    data: {
      moduleName: 'TypicalDeliveryDateForASupplyOrder'
    },
},

{
    path: 'typical-external-body-equipped-for-schools', loadChildren: './components/typical-external-body-equipped-for-schools/typical-external-body-equipped-for-schools.module#TypicalExternalBodyEquippedForSchoolsModule',
    data: {
      moduleName: 'TypicalExternalBodyEquippedForSchools'
    },
},

{
    path: 'typical-final-examination-committee-report', loadChildren: './components/typical-final-examination-committee-report/typical-final-examination-committee-report.module#TypicalFinalExaminationCommitteeReportModule',
    data: {
      moduleName: 'TypicalFinalExaminationCommitteeReport'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalProcessingRoutingModule {
}

