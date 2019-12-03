
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LaboratoryEquipmentComponent } from './laboratory-equipment.component';


const routes: Routes = [
  {
    path: '',
    component: LaboratoryEquipmentComponent,
  },
  
  
  
{
    path: 'link-subitems-to-the-main-items', loadChildren: './components/link-subitems-to-the-main-items/link-subitems-to-the-main-items.module#LinkSubitemsToTheMainItemsModule',
    data: {
      moduleName: 'LinkSubitemsToTheMainItems'
    },
},

{
    path: 'external-bodies-equipped-for-schools', loadChildren: './components/external-bodies-equipped-for-schools/external-bodies-equipped-for-schools.module#ExternalBodiesEquippedForSchoolsModule',
    data: {
      moduleName: 'ExternalBodiesEquippedForSchools'
    },
},

{
    path: 'follow-up-the-supply-of-certain-items-at-the-level-of-branches', loadChildren: './components/follow-up-the-supply-of-certain-items-at-the-level-of-branches/follow-up-the-supply-of-certain-items-at-the-level-of-branches.module#FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesModule',
    data: {
      moduleName: 'FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches'
    },
},

{
    path: 'form-a-disbursement-form', loadChildren: './components/form-a-disbursement-form/form-a-disbursement-form.module#FormADisbursementFormModule',
    data: {
      moduleName: 'FormADisbursementForm'
    },
},

{
    path: 'issuing-a-supply-order-for-a-school', loadChildren: './components/issuing-a-supply-order-for-a-school/issuing-a-supply-order-for-a-school.module#IssuingASupplyOrderForASchoolModule',
    data: {
      moduleName: 'IssuingASupplyOrderForASchool'
    },
},

{
    path: 'schools-equipped-by-other', loadChildren: './components/schools-equipped-by-other/schools-equipped-by-other.module#SchoolsEquippedByOtherModule',
    data: {
      moduleName: 'SchoolsEquippedByOther'
    },
},

{
    path: 'the-date-of-education-for-a-supply-order-issued-to-a-school', loadChildren: './components/the-date-of-education-for-a-supply-order-issued-to-a-school/the-date-of-education-for-a-supply-order-issued-to-a-school.module#TheDateOfEducationForASupplyOrderIssuedToASchoolModule',
    data: {
      moduleName: 'TheDateOfEducationForASupplyOrderIssuedToASchool'
    },
},

{
    path: 'the-lists-required-to-equip-all-schools', loadChildren: './components/the-lists-required-to-equip-all-schools/the-lists-required-to-equip-all-schools.module#TheListsRequiredToEquipAllSchoolsModule',
    data: {
      moduleName: 'TheListsRequiredToEquipAllSchools'
    },
},

{
    path: 'transfer-of-supply-orders-from-schools-closure', loadChildren: './components/transfer-of-supply-orders-from-schools-closure/transfer-of-supply-orders-from-schools-closure.module#TransferOfSupplyOrdersFromSchoolsClosureModule',
    data: {
      moduleName: 'TransferOfSupplyOrdersFromSchoolsClosure'
    },
},

{
    path: 'approval-for-equipping-schools-approvals', loadChildren: './components/approval-for-equipping-schools-approvals/approval-for-equipping-schools-approvals.module#ApprovalForEquippingSchoolsApprovalsModule',
    data: {
      moduleName: 'ApprovalForEquippingSchoolsApprovals'
    },
},

{
    path: 'assay-data', loadChildren: './components/assay-data/assay-data.module#AssayDataModule',
    data: {
      moduleName: 'AssayData'
    },
},

{
    path: 'assay-lists', loadChildren: './components/assay-lists/assay-lists.module#AssayListsModule',
    data: {
      moduleName: 'AssayLists'
    },
},

{
    path: 'equipment-plan-for-branch-school', loadChildren: './components/equipment-plan-for-branch-school/equipment-plan-for-branch-school.module#EquipmentPlanForBranchSchoolModule',
    data: {
      moduleName: 'EquipmentPlanForBranchSchool'
    },
},

{
    path: 'items-of-assay-lists', loadChildren: './components/items-of-assay-lists/items-of-assay-lists.module#ItemsOfAssayListsModule',
    data: {
      moduleName: 'ItemsOfAssayLists'
    },
},

  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LaboratoryEquipmentRoutingModule {
}

