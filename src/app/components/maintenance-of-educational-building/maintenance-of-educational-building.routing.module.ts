
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenanceOfEducationalBuildingComponent } from './maintenance-of-educational-building.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceOfEducationalBuildingComponent,
  },
{
    path: 'building-data', loadChildren: './components/building-data/building-data.module#BuildingDataModule',
    data: {
      moduleName: 'BuildingData'
    },
},

{
    path: 'cancel-from-the-maintenance-plan', loadChildren: './components/cancel-from-the-maintenance-plan/cancel-from-the-maintenance-plan.module#CancelFromTheMaintenancePlanModule',
    data: {
      moduleName: 'CancelFromTheMaintenancePlan'
    },
},

{
    path: 'maintenance-of-educational-buildings-list-of-ready-toilet', loadChildren: './components/maintenance-of-educational-buildings-list-of-ready-toilet/maintenance-of-educational-buildings-list-of-ready-toilet.module#MaintenanceOfEducationalBuildingsListOfReadyToiletModule',
    data: {
      moduleName: 'MaintenanceOfEducationalBuildingsListOfReadyToilet'
    },
},

{
    path: 'maintenance-plan', loadChildren: './components/maintenance-plan/maintenance-plan.module#MaintenancePlanModule',
    data: {
      moduleName: 'MaintenancePlan'
    },
},

{
    path: 'print-maintenance-indexation-building', loadChildren: './components/print-maintenance-indexation-building/print-maintenance-indexation-building.module#PrintMaintenanceIndexationBuildingModule',
    data: {
      moduleName: 'PrintMaintenanceIndexationBuilding'
    },
},

{
    path: 'record-contractor-prices-on-maintenance-assurance-items', loadChildren: './components/record-contractor-prices-on-maintenance-assurance-items/record-contractor-prices-on-maintenance-assurance-items.module#RecordContractorPricesOnMaintenanceAssuranceItemsModule',
    data: {
      moduleName: 'RecordContractorPricesOnMaintenanceAssuranceItems'
    },
},

{
    path: 'record-the-position-of-the-internship', loadChildren: './components/record-the-position-of-the-internship/record-the-position-of-the-internship.module#RecordThePositionOfTheInternshipModule',
    data: {
      moduleName: 'RecordThePositionOfTheInternship'
    },
},

{
    path: 'register-the-movement-of-ready-toilets', loadChildren: './components/register-the-movement-of-ready-toilets/register-the-movement-of-ready-toilets.module#RegisterTheMovementOfReadyToiletsModule',
    data: {
      moduleName: 'RegisterTheMovementOfReadyToilets'
    },
},

{
    path: 'tender-for-buildings-maintenance-plan', loadChildren: './components/tender-for-buildings-maintenance-plan/tender-for-buildings-maintenance-plan.module#TenderForBuildingsMaintenancePlanModule',
    data: {
      moduleName: 'TenderForBuildingsMaintenancePlan'
    },
},

{
    path: 'the-codes-and-names-of-the-cases', loadChildren: './components/the-codes-and-names-of-the-cases/the-codes-and-names-of-the-cases.module#TheCodesAndNamesOfTheCasesModule',
    data: {
      moduleName: 'TheCodesAndNamesOfTheCases'
    },
},

{
    path: 'cleanliness-business-plan', loadChildren: './components/cleanliness-business-plan/cleanliness-business-plan.module#CleanlinessBusinessPlanModule',
    data: {
      moduleName: 'CleanlinessBusinessPlan'
    },
},

{
    path: 'contractors-claim', loadChildren: './components/contractors-claim/contractors-claim.module#ContractorsClaimModule',
    data: {
      moduleName: 'ContractorsClaim'
    },
},

{
    path: 'data-withdrawal-note', loadChildren: './components/data-withdrawal-note/data-withdrawal-note.module#DataWithdrawalNoteModule',
    data: {
      moduleName: 'DataWithdrawalNote'
    },
},

{
    path: 'define-a-new-model', loadChildren: './components/define-a-new-model/define-a-new-model.module#DefineANewModelModule',
    data: {
      moduleName: 'DefineANewModel'
    },
},

{
    path: 'defining-a-new-toilet', loadChildren: './components/defining-a-new-toilet/defining-a-new-toilet.module#DefiningANewToiletModule',
    data: {
      moduleName: 'DefiningANewToilet'
    },
},

{
    path: 'follow-up-daily-maintenance', loadChildren: './components/follow-up-daily-maintenance/follow-up-daily-maintenance.module#FollowUpDailyMaintenanceModule',
    data: {
      moduleName: 'FollowUpDailyMaintenance'
    },
},

{
    path: 'indexation-building-maintenance', loadChildren: './components/indexation-building-maintenance/indexation-building-maintenance.module#IndexationBuildingMaintenanceModule',
    data: {
      moduleName: 'IndexationBuildingMaintenance'
    },
},

{
    path: 'inspection-form', loadChildren: './components/inspection-form/inspection-form.module#InspectionFormModule',
    data: {
      moduleName: 'InspectionForm'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenanceOfEducationalBuildingRoutingModule {
}

