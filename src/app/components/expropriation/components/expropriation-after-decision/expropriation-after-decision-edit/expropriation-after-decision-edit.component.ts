
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExpropriationAfterDecision } from 'app/shared/models/expropriation-after-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExpropriationAfterDecisionService } from '../shared/expropriation-after-decision.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-after-decision-edit',
  templateUrl: './expropriation-after-decision-edit.component.html',
  styleUrls: ['./expropriation-after-decision-edit.component.scss'],
  providers: []
})

export class ExpropriationAfterDecisionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationAfterDecision: ExpropriationAfterDecision;
  expropriationAfterDecisionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('resolutionNumber', { static: true }) ResolutionNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationAfterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationAfterDecisionEditComponent>,
    public expropriationAfterDecisionService: ExpropriationAfterDecisionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationAfterDecision = new ExpropriationAfterDecision();
    this.selectedExpropriationAfterDecision = this.selectedExpropriationAfterDecisionDialog.data || this.selectedExpropriationAfterDecision;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.resolutionNumberSelectOptions = new MaterialSelectOptions({
	 data: this.decisionNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم القرار',
	});


    this.expropriationAfterDecisionForm = this.formBuilder.group({
      
  id : [this.selectedExpropriationAfterDecision.id],
  buildingCode : [this.selectedExpropriationAfterDecision.buildingCode, [ Validators.required ]],
  dateOfBecision : [this.selectedExpropriationAfterDecision.dateOfBecision, [ Validators.required ]],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.numberOfPublicationInTheOfficialGazette, [ Validators.required ]],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.dateOfPublicationInTheOfficialGazette, [ Validators.required ]],
  educationProject : [this.selectedExpropriationAfterDecision.educationProject, [ Validators.required ]],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationAfterDecision.theNumberOfOwnersInThePresentationStatements, [ Validators.required ]],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationAfterDecision.thePriceOfAMeterInTheSupplyStatements, [ Validators.required ]],
  dateFromThePresentationLists : [this.selectedExpropriationAfterDecision.dateFromThePresentationLists, [ Validators.required ]],
  dateToOfThePresentationStatements : [this.selectedExpropriationAfterDecision.dateToOfThePresentationStatements, [ Validators.required ]],
  numberOfSalesForms : [this.selectedExpropriationAfterDecision.numberOfSalesForms, [ Validators.required ]],
  branchCode : [this.selectedExpropriationAfterDecision.branchCode, [ Validators.required ]],
  resolutionNumber : [this.selectedExpropriationAfterDecision.resolutionNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.expropriationAfterDecisionService.update(this.expropriationAfterDecisionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.expropriationAfterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.expropriationAfterDecisionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
}
