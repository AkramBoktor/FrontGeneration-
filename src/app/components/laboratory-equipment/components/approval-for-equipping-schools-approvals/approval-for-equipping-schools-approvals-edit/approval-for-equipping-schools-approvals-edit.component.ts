
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ApprovalForEquippingSchoolsApprovals } from 'app/shared/models/approval-for-equipping-schools-approvals';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ApprovalForEquippingSchoolsApprovalsService } from '../shared/approval-for-equipping-schools-approvals.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-approval-for-equipping-schools-approvals-edit',
  templateUrl: './approval-for-equipping-schools-approvals-edit.component.html',
  styleUrls: ['./approval-for-equipping-schools-approvals-edit.component.scss'],
  providers: []
})

export class ApprovalForEquippingSchoolsApprovalsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedApprovalForEquippingSchoolsApprovals: ApprovalForEquippingSchoolsApprovals;
  approvalForEquippingSchoolsApprovalsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedApprovalForEquippingSchoolsApprovalsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ApprovalForEquippingSchoolsApprovalsEditComponent>,
    public approvalForEquippingSchoolsApprovalsService: ApprovalForEquippingSchoolsApprovalsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedApprovalForEquippingSchoolsApprovals = new ApprovalForEquippingSchoolsApprovals();
    this.selectedApprovalForEquippingSchoolsApprovals = this.selectedApprovalForEquippingSchoolsApprovalsDialog.data || this.selectedApprovalForEquippingSchoolsApprovals;

    
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
      
  id : [this.selectedApprovalForEquippingSchoolsApprovals.id],
  yearPlan : [this.selectedApprovalForEquippingSchoolsApprovals.yearPlan, [ ]],
  processingType : [this.selectedApprovalForEquippingSchoolsApprovals.processingType, [ ]],
  branch : [this.selectedApprovalForEquippingSchoolsApprovals.branch, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.approvalForEquippingSchoolsApprovalsService.update(this.approvalForEquippingSchoolsApprovalsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.approvalForEquippingSchoolsApprovalsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.approvalForEquippingSchoolsApprovalsForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
