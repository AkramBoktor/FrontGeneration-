
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EquipmentPlanForBranchSchool } from 'app/shared/models/equipment-plan-for-branch-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EquipmentPlanForBranchSchoolEditComponent } from '../equipment-plan-for-branch-school-edit/equipment-plan-for-branch-school-edit.component';
import { EquipmentPlanForBranchSchoolNewComponent } from '../equipment-plan-for-branch-school-new/equipment-plan-for-branch-school-new.component';
import { EquipmentPlanForBranchSchoolViewComponent } from '../equipment-plan-for-branch-school-view/equipment-plan-for-branch-school-view.component';
import { EquipmentPlanForBranchSchoolService } from '../shared/equipment-plan-for-branch-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-equipment-plan-for-branch-school-list',
  templateUrl: './equipment-plan-for-branch-school-list.component.html',
  styleUrls: ['./equipment-plan-for-branch-school-list.component.scss'],
  providers: []
})

export class EquipmentPlanForBranchSchoolListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private planTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
planTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('planType', { static: true }) PlanTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEquipmentPlanForBranchSchool: EquipmentPlanForBranchSchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الخطة للتجهيزات', field: 'equipmentPlanYear' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionNumber' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الخطة', field: 'planType' }),
	new GridColumnOptions({ headerName: 'الفرع', field: 'branch' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EquipmentPlanForBranchSchoolViewComponent,
    editDialogClassType: EquipmentPlanForBranchSchoolEditComponent,
    newDialogClassType: EquipmentPlanForBranchSchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public equipmentPlanForBranchSchoolService: EquipmentPlanForBranchSchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEquipmentPlanForBranchSchool = new EquipmentPlanForBranchSchool();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.planTypeSelectOptions = new MaterialSelectOptions({
	 data: this.planTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخطة',
	});

	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	equipmentPlanYear : [],
	schoolNumber : [],
	extensionNumber : [],
	processingType : [],
	planType : [],
	branch : []
    });

     
  }

  getEquipmentPlanForBranchSchoolsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EquipmentPlanForBranchSchool[]> => {
    return this.equipmentPlanForBranchSchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.equipmentPlanForBranchSchoolService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.planTypesService = new LookupService('plantypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

