
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ApprovalForEquippingSchoolsApprovals } from 'app/shared/models/approval-for-equipping-schools-approvals';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ApprovalForEquippingSchoolsApprovalsEditComponent } from '../approval-for-equipping-schools-approvals-edit/approval-for-equipping-schools-approvals-edit.component';
import { ApprovalForEquippingSchoolsApprovalsNewComponent } from '../approval-for-equipping-schools-approvals-new/approval-for-equipping-schools-approvals-new.component';
import { ApprovalForEquippingSchoolsApprovalsViewComponent } from '../approval-for-equipping-schools-approvals-view/approval-for-equipping-schools-approvals-view.component';
import { ApprovalForEquippingSchoolsApprovalsService } from '../shared/approval-for-equipping-schools-approvals.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-approval-for-equipping-schools-approvals-list',
  templateUrl: './approval-for-equipping-schools-approvals-list.component.html',
  styleUrls: ['./approval-for-equipping-schools-approvals-list.component.scss'],
  providers: []
})

export class ApprovalForEquippingSchoolsApprovalsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  
  @Input() selectedApprovalForEquippingSchoolsApprovals: ApprovalForEquippingSchoolsApprovals;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المدرسة', field: 'schoolCode' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'حالة الموافقة', field: 'approvalStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ApprovalForEquippingSchoolsApprovalsViewComponent,
    editDialogClassType: ApprovalForEquippingSchoolsApprovalsEditComponent,
    newDialogClassType: ApprovalForEquippingSchoolsApprovalsNewComponent,
  });
    constructor(
        injector: Injector,
        public approvalForEquippingSchoolsApprovalsService: ApprovalForEquippingSchoolsApprovalsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedApprovalForEquippingSchoolsApprovals = new ApprovalForEquippingSchoolsApprovals();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	processingType : [],
	branch : []
    });

     
  }

  getApprovalForEquippingSchoolsApprovalsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ApprovalForEquippingSchoolsApprovals[]> => {
    return this.approvalForEquippingSchoolsApprovalsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.approvalForEquippingSchoolsApprovalsService.delete(param.data.id)
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
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

