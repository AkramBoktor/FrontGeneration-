
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches } from 'app/shared/models/follow-up-the-supply-of-certain-items-at-the-level-of-branches';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService } from '../shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-follow-up-the-supply-of-certain-items-at-the-level-of-branches-new',
  templateUrl: './follow-up-the-supply-of-certain-items-at-the-level-of-branches-new.component.html',
  styleUrls: ['./follow-up-the-supply-of-certain-items-at-the-level-of-branches-new.component.scss'],
  providers: [
    ]
})

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent extends AppBaseComponent implements OnInit {
  followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm: FormGroup;
  @Input() selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent>,
    public followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches = new FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches();

    
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
     
  id : [0],
  yearPlan : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.yearPlan, [ ]],
  bidNumber : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.bidNumber, [ ]],
  orderNumber : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.orderNumber, [ ]],
  supplyOrderDate : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.supplyOrderDate, [ ]],
  constructionPlanYear : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.constructionPlanYear, [ ]],
  buildingName : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.buildingName, [ ]],
  number : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.number, [ ]],
  companyName : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.companyName, [ ]],
  processingType : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.processingType, [ ]],
  offeringType : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.offeringType, [ ]],
  offeringMethod : [this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches.offeringMethod, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService.create(this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm.value)
        .pipe(switchMap(x => {
			return this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
 }
