import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/pages/authentication/login/login.component';

const routes: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/home', pathMatch: 'full'
            },
            {
                path: 'lookup', loadChildren: './shared/pages/lookup-form/lookup-form.module#LookupFormModule',
            },
            {
                path: 'profile', loadChildren: './shared/pages/profile/profile.module#ProfileModule',
                data: {
                    menuName: 'profile'
                }
            },
            {
                path: 'vacation', loadChildren: './components/vacation/vacation.module#VacationModule',
                data: {
                    menuName: 'vacation'
                }
            },

            {
                path: 'employee', loadChildren: './components/employee/employee.module#EmployeeModule',
                data: {
                    menuName: 'employee'
                }
            },

            {
                path: 'laboratory-equipment', loadChildren: './components/laboratory-equipment/laboratory-equipment.module#LaboratoryEquipmentModule',
                data: {
                    menuName: 'laboratory-equipment'
                }
            },

            {
                path: 'cooperative-society', loadChildren: './components/cooperative-society/cooperative-society.module#CooperativeSocietyModule',
                data: {
                    menuName: 'cooperative-society'
                }
            },

            {
                path: 'social-security', loadChildren: './components/social-security/social-security.module#SocialSecurityModule',
                data: {
                    menuName: 'social-security'
                }
            },

            {
                path: 'transport-and-movement', loadChildren: './components/transport-and-movement/transport-and-movement.module#TransportAndMovementModule',
                data: {
                    menuName: 'transport-and-movement'
                }
            },

            {
                path: 'followup-project', loadChildren: './components/followup-project/followup-project.module#FollowupProjectModule',
                data: {
                    menuName: 'followup-project'
                }
            },

            {
                path: 'organization-and-management-training', loadChildren: './components/organization-and-management-training/organization-and-management-training.module#OrganizationAndManagementTrainingModule',
                data: {
                    menuName: 'organization-and-management-training'
                }
            },

            {
                path: 'public-relations', loadChildren: './components/public-relations/public-relations.module#PublicRelationsModule',
                data: {
                    menuName: 'public-relations'
                }
            },

            {
                path: 'investigations', loadChildren: './components/investigations/investigations.module#InvestigationsModule',
                data: {
                    menuName: 'investigations'
                }
            },

            {
                path: 'time-management', loadChildren: './components/time-management/time-management.module#TimeManagementModule',
                data: {
                    menuName: 'time-management'
                }
            },

            {
                path: 'organization-and-management-housing', loadChildren: './components/organization-and-management-housing/organization-and-management-housing.module#OrganizationAndManagementHousingModule',
                data: {
                    menuName: 'organization-and-management-housing'
                }
            },

            {
                path: 'health-units-ministry', loadChildren: './components/health-units-ministry/health-units-ministry.module#HealthUnitsMinistryOfSolidarityPostalAuthorityModule',
                data: {
                    menuName: 'health-units-ministry'
                }
            },

            {
                path: 'purchase', loadChildren: './components/purchase/purchase.module#PurchaseModule',
                data: {
                    menuName: 'purchase'
                }
            },

            {
                path: 'school-map', loadChildren: './components/school-map/school-map.module#SchoolMapModule',
                data: {
                    menuName: 'school-map'
                }
            },

            {
                path: 'services-association', loadChildren: './components/services-association/services-association.module#ServicesAssociationModule',
                data: {
                    menuName: 'services-association'
                }
            },

            {
                path: 'case', loadChildren: './components/case/case.module#CaseModule',
                data: {
                    menuName: 'case'
                }
            },

            {
                path: 'social-solidarity-fund', loadChildren: './components/social-solidarity-fund/social-solidarity-fund.module#SocialSolidarityFundModule',
                data: {
                    menuName: 'social-solidarity-fund'
                }
            },

            {
                path: 'guild', loadChildren: './components/guild/guild.module#GuildModule',
                data: {
                    menuName: 'guild'
                }
            },

            {
                path: 'library', loadChildren: './components/library/library.module#LibraryModule',
                data: {
                    menuName: 'library'
                }
            },

            {
                path: 'social-solidarity-fund-a', loadChildren: './components/social-solidarity-fund-a/social-solidarity-fund-a.module#SocialSolidarityFundAModule',
                data: {
                    menuName: 'social-solidarity-fund-a'
                }
            },

            {
                path: 'salary-calculation', loadChildren: './components/salary-calculation/salary-calculation.module#SalaryCalculationModule',
                data: {
                    menuName: 'salary-calculation'
                }
            },

            {
                path: 'pharmacy', loadChildren: './components/pharmacy/pharmacy.module#PharmacyModule',
                data: {
                    menuName: 'pharmacy'
                }
            },

            {
                path: 'timing-and-pricing', loadChildren: './components/timing-and-pricing/timing-and-pricing.module#TimingAndPricingModule',
                data: {
                    menuName: 'timing-and-pricing'
                }
            },

            {
                path: 'quality-management', loadChildren: './components/quality-management/quality-management.module#QualityManagementModule',
                data: {
                    menuName: 'quality-management'
                }
            },

            {
                path: 'store', loadChildren: './components/store/store.module#StoreModule',
                data: {
                    menuName: 'store'
                }
            },

            {
                path: 'clinic', loadChildren: './components/clinic/clinic.module#ClinicModule',
                data: {
                    menuName: 'clinic'
                }
            },

            {
                path: 'computer-maintenance', loadChildren: './components/computer-maintenance/computer-maintenance.module#ComputerMaintenanceModule',
                data: {
                    menuName: 'computer-maintenance'
                }
            },

            {
                path: 'social-solidarity-fund-b', loadChildren: './components/social-solidarity-fund-b/social-solidarity-fund-b.module#SocialSolidarityFundBModule',
                data: {
                    menuName: 'social-solidarity-fund-b'
                }
            },

            {
                path: 'social-solidarity-fund-g', loadChildren: './components/social-solidarity-fund-g/social-solidarity-fund-g.module#SocialSolidarityFundGModule',
                data: {
                    menuName: 'social-solidarity-fund-g'
                }
            },

            {
                path: 'maintenance-of-educational-building', loadChildren: './components/maintenance-of-educational-building/maintenance-of-educational-building.module#MaintenanceOfEducationalBuildingModule',
                data: {
                    menuName: 'maintenance-of-educational-building'
                }
            },

            {
                path: 'accounts', loadChildren: './components/accounts/accounts.module#AccountsModule',
                data: {
                    menuName: 'accounts'
                }
            },

            {
                path: 'inspection-of-buildings', loadChildren: './components/inspection-of-buildings/inspection-of-buildings.module#InspectionOfBuildingsModule',
                data: {
                    menuName: 'inspection-of-buildings'
                }
            },

            {
                path: 'rented-buildings', loadChildren: './components/rented-buildings/rented-buildings.module#RentedBuildingsModule',
                data: {
                    menuName: 'rented-buildings'
                }
            },

            {
                path: 'weights-differences', loadChildren: './components/weights-differences/weights-differences.module#WeightsDifferencesModule',
                data: {
                    menuName: 'weights-differences'
                }
            },

            {
                path: 'maintenance-of-machinery-and-equipment', loadChildren: './components/maintenance-of-machinery-and-equipment/maintenance-of-machinery-and-equipment.module#MaintenanceOfMachineryAndEquipmentModule',
                data: {
                    menuName: 'maintenance-of-machinery-and-equipment'
                }
            },

            {
                path: 'free-query-for-statistical-bulletin', loadChildren: './components/free-query-for-statistical-bulletin/free-query-for-statistical-bulletin.module#FreeQueryForStatisticalBulletinModule',
                data: {
                    menuName: 'free-query-for-statistical-bulletin'
                }
            },

            {
                path: 'population-growth-model', loadChildren: './components/population-growth-model/population-growth-model.module#PopulationGrowthModelModule',
                data: {
                    menuName: 'population-growth-model'
                }
            },

            {
                path: 'education-deprived-areas', loadChildren: './components/education-deprived-areas/education-deprived-areas.module#EducationDeprivedAreasModule',
                data: {
                    menuName: 'education-deprived-areas'
                }
            },

            {
                path: 'classroom-requirements', loadChildren: './components/classroom-requirements/classroom-requirements.module#ClassroomRequirementsModule',
                data: {
                    menuName: 'classroom-requirements'
                }
            },

            {
                path: 'typical-processing', loadChildren: './components/typical-processing/typical-processing.module#TypicalProcessingModule',
                data: {
                    menuName: 'typical-processing'
                }
            },

            {
                path: 'land', loadChildren: './components/land/land.module#LandModule',
                data: {
                    menuName: 'land'
                }
            },

            {
                path: 'expropriation', loadChildren: './components/expropriation/expropriation.module#ExpropriationModule',
                data: {
                    menuName: 'expropriation'
                }
            },

            {
                path: 'pooled-decimal', loadChildren: './components/pooled-decimal/pooled-decimal.module#PooledDecimalModule',
                data: {
                    menuName: 'pooled-decimal'
                }
            },

            {
                path: 'assay', loadChildren: './components/assay/assay.module#AssayModule',
                data: {
                    menuName: 'assay'
                }
            },

            {
                path: 'assay--unctions-of-items-and-elements-of-the-project', loadChildren: './components/assay-unctions-of-items-and-elements-of-the-project/assay-unctions-of-items-and-elements-of-the-project.module#AssayUnctionsOfItemsAndElementsOfTheProjectModule',
                data: {
                    menuName: 'assay--unctions-of-items-and-elements-of-the-project'
                }
            },

            {
                path: 'assay-list-subsystem-code', loadChildren: './components/assay-list-subsystem-code/assay-list-subsystem-code.module#AssayListSubsystemCodeModule',
                data: {
                    menuName: 'assay-list-subsystem-code'
                }
            },

            {
                path: 'assay-subsystem-of-assays', loadChildren: './components/assay-subsystem-of-assays/assay-subsystem-of-assays.module#AssaySubsystemOfAssaysModule',
                data: {
                    menuName: 'assay-subsystem-of-assays'
                }
            },

            {
                path: 'building-inspection-and-validity-certificate', loadChildren: './components/building-inspection-and-validity-certificate/building-inspection-and-validity-certificate.module#BuildingInspectionAndValidityCertificateModule',
                data: {
                    menuName: 'building-inspection-and-validity-certificate'
                }
            },

            {
                path: 'assay-list-of-creation-of-works-of-others', loadChildren: './components/assay-list-of-creation-of-works-of-others/assay-list-of-creation-of-works-of-others.module#AssayListOfCreationOfWorksOfOthersModule',
                data: {
                    menuName: 'assay-list-of-creation-of-works-of-others'
                }
            },

            {
                path: 'assay-work-of-clouds-assays', loadChildren: './components/assay-work-of-clouds-assays/assay-work-of-clouds-assays.module#AssayWorkOfCloudsAssaysModule',
                data: {
                    menuName: 'assay-work-of-clouds-assays'
                }
            },

            {
                path: 'assay-building-weight-factor-list', loadChildren: './components/assay-building-weight-factor-list/assay-building-weight-factor-list.module#AssayBuildingWeightFactorListModule',
                data: {
                    menuName: 'assay-building-weight-factor-list'
                }
            },

            {
                path: 'assay-post-office-development', loadChildren: './components/assay-post-office-development/assay-post-office-development.module#AssayPostOfficeDevelopmentModule',
                data: {
                    menuName: 'assay-post-office-development'
                }
            },

            {
                path: 'assay-assay-list-authority-price-list', loadChildren: './components/assay-assay-list-authority-price-list/assay-assay-list-authority-price-list.module#AssayAssayListAuthorityPriceListModule',
                data: {
                    menuName: 'assay-assay-list-authority-price-list'
                }
            },

            {
                path: 'assay-assay-list-building-models-work', loadChildren: './components/assay-assay-list-building-models-work/assay-assay-list-building-models-work.module#AssayAssayListBuildingModelsWorkModule',
                data: {
                    menuName: 'assay-assay-list-building-models-work'
                }
            },

            {
                path: 'assay-assay-list-building-assay', loadChildren: './components/assay-assay-list-building-assay/assay-assay-list-building-assay.module#AssayAssayListBuildingAssayModule',
                data: {
                    menuName: 'assay-assay-list-building-assay'
                }
            },

            {
                path: 'secretarial-and-archives', loadChildren: './components/secretarial-and-archives/secretarial-and-archives.module#SecretarialAndArchivesModule',
                data: {
                    menuName: 'secretarial-and-archives'
                }
            },

            {
                path: 'technical-secretariat', loadChildren: './components/technical-secretariat/technical-secretariat.module#TechnicalSecretariatModule',
                data: {
                    menuName: 'technical-secretariat'
                }
            },

            {
                path: 'research-and-studies', loadChildren: './components/research-and-studies/research-and-studies.module#ResearchAndStudiesModule',
                data: {
                    menuName: 'research-and-studies'
                }
            },

            {
                path: 'competitions-personnel-affairs', loadChildren: './components/competitions-personnel-affairs/competitions-personnel-affairs.module#CompetitionsPersonnelAffairsModule',
                data: {
                    menuName: 'competitions-personnel-affairs'
                }
            },

            {
                path: 'budget', loadChildren: './components/budget/budget.module#BudgetModule',
                data: {
                    menuName: 'budget'
                }
            },

            {
                path: 'educational-study', loadChildren: './components/educational-study/educational-study.module#EducationalStudyModule',
                data: {
                    menuName: 'educational-study'
                }
            },

            {
                path: 'office-of-the-director-of-the-commission', loadChildren: './components/office-of-the-director-of-the-commission/office-of-the-director-of-the-commission.module#OfficeOfTheDirectorOfTheCommissionModule',
                data: {
                    menuName: 'office-of-the-director-of-the-commission'
                }
            },

            {
                path: 'planning-and-followup', loadChildren: './components/planning-and-followup/planning-and-followup.module#PlanningAndFollowupModule',
                data: {
                    menuName: 'planning-and-followup'
                }
            },

            {
                path: 'international-cooperation', loadChildren: './components/international-cooperation/international-cooperation.module#InternationalCooperationModule',
                data: {
                    menuName: 'international-cooperation'
                }
            },

            {
                path: 'business-to-others', loadChildren: './components/business-to-others/business-to-others.module#BusinessToOthersModule',
                data: {
                    menuName: 'business-to-others'
                }
            },

            {
                path: 'branch-manager', loadChildren: './components/branch-manager/branch-manager.module#BranchManagerModule',
                data: {
                    menuName: 'branch-manager'
                }
            },

            {
                path: 'extract', loadChildren: './components/extract/extract.module#ExtractModule',
                data: {
                    menuName: 'extract'
                }
            },

            {
                path: 'school-branches-map', loadChildren: './components/school-branches-map/school-branches-map.module#SchoolBranchesMapModule',
                data: {
                    menuName: 'school-branches-map'
                }
            },

            {
                path: 'balancing-part-6', loadChildren: './components/balancing-part-6/balancing-part-6.module#BalancingPart6Module',
                data: {
                    menuName: 'balancing-part-6'
                }
            },

            {
                path: 'post-offices', loadChildren: './components/post-offices/post-offices.module#PostOfficesModule',
                data: {
                    menuName: 'post-offices'
                }
            },

            {
                path: 'balancing-part-1', loadChildren: './components/balancing-part-1/balancing-part-1.module#BalancingPart1Module',
                data: {
                    menuName: 'balancing-part-1'
                }
            },

            {
                path: 'balancing-part-2', loadChildren: './components/balancing-part-2/balancing-part-2.module#BalancingPart2Module',
                data: {
                    menuName: 'balancing-part-2'
                }
            },

            {
                path: 'land-branch', loadChildren: './components/land-branch/land-branch.module#LandBranchModule',
                data: {
                    menuName: 'land-branch'
                }
            },

            {
                path: 'ministry-of-solidarity', loadChildren: './components/ministry-of-solidarity/ministry-of-solidarity.module#MinistryOfSolidarityModule',
                data: {
                    menuName: 'ministry-of-solidarity'
                }
            },

            {
                path: 'time-control', loadChildren: './components/time-control/time-control.module#TimeControlModule',
                data: {
                    menuName: 'time-control'
                }
            },

            {
                path: 'contracts', loadChildren: './components/contracts/contracts.module#ContractsModule',
                data: {
                    menuName: 'contracts'
                }
            },

            {
                path: 'probes', loadChildren: './components/probes/probes.module#ProbesModule',
                data: {
                    menuName: 'probes'
                }
            },



        ]
        
    },


    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'home', loadChildren: './shared/pages/home/home.module#HomeModule',
        data: {
            menuName: 'home'
        }
    },
    {
        path: '**',
        loadChildren: './shared/pages/not-found/not-found.module#NotFoundModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
