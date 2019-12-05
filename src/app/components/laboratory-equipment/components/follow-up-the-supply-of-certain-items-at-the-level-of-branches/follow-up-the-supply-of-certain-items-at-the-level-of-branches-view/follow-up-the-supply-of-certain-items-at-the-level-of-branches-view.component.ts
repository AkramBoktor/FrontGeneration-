
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches } from 'app/shared/models/follow-up-the-supply-of-certain-items-at-the-level-of-branches';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService } from '../shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-follow-up-the-supply-of-certain-items-at-the-level-of-branches-view',
  templateUrl: './follow-up-the-supply-of-certain-items-at-the-level-of-branches-view.component.html',
  styleUrls: ['./follow-up-the-supply-of-certain-items-at-the-level-of-branches-view.component.scss'],
  providers: []
})

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches;
  followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent>,
    public followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches = this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesDialog.data || this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});


    this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm = this.formBuilder.group({
      
  yearPlan : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.yearPlan],
  bidNumber : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.bidNumber],
  orderNumber : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.orderNumber],
  supplyOrderDate : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.supplyOrderDate],
  constructionPlanYear : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.constructionPlanYear],
  buildingName : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.buildingName],
  number : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.number],
  companyName : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.companyName],
  processingType : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.processingType],
  offeringType : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.offeringType],
  offeringMethod : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.offeringMethod]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm.controls)) {
      this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}

