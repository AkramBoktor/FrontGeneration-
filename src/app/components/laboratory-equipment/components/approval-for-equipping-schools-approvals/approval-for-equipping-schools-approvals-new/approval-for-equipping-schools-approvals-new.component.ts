
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ApprovalForEquippingSchoolsApprovals } from 'app/shared/models/approval-for-equipping-schools-approvals';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ApprovalForEquippingSchoolsApprovalsService } from '../shared/approval-for-equipping-schools-approvals.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-approval-for-equipping-schools-approvals-new',
  templateUrl: './approval-for-equipping-schools-approvals-new.component.html',
  styleUrls: ['./approval-for-equipping-schools-approvals-new.component.scss'],
  providers: [
    ]
})

export class ApprovalForEquippingSchoolsApprovalsNewComponent extends AppBaseComponent implements OnInit {
  approvalForEquippingSchoolsApprovalsForm: FormGroup;
  @Input() selectedApprovalForEquippingSchoolsApprovals: ApprovalForEquippingSchoolsApprovals;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ApprovalForEquippingSchoolsApprovalsNewComponent>,
    public approvalForEquippingSchoolsApprovalsService: ApprovalForEquippingSchoolsApprovalsService)
    {
    super(injector);
    }
    
  ngOnInit() {
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


    this.approvalForEquippingSchoolsApprovalsForm = this.formBuilder.group({
     
  id : [0],
  yearPlan : [this.selectedApprovalForEquippingSchoolsApprovals.yearPlan, [ ]],
  processingType : [this.selectedApprovalForEquippingSchoolsApprovals.processingType, [ ]],
  branch : [this.selectedApprovalForEquippingSchoolsApprovals.branch, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.approvalForEquippingSchoolsApprovalsService.create(this.approvalForEquippingSchoolsApprovalsForm.value)
        .pipe(switchMap(x => {
			return this.approvalForEquippingSchoolsApprovalsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.approvalForEquippingSchoolsApprovalsForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
