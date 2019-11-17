
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExpropriationDataAfterThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-after-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExpropriationDataAfterThePrimeMinisterDecisionService } from '../shared/expropriation-data-after-the-prime-minister-decision.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-data-after-the-prime-minister-decision-edit',
  templateUrl: './expropriation-data-after-the-prime-minister-decision-edit.component.html',
  styleUrls: ['./expropriation-data-after-the-prime-minister-decision-edit.component.scss'],
  providers: []
})

export class ExpropriationDataAfterThePrimeMinisterDecisionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationDataAfterThePrimeMinisterDecision: ExpropriationDataAfterThePrimeMinisterDecision;
  expropriationDataAfterThePrimeMinisterDecisionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('resolutionNumber', { static: true }) ResolutionNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationDataAfterThePrimeMinisterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataAfterThePrimeMinisterDecisionEditComponent>,
    public expropriationDataAfterThePrimeMinisterDecisionService: ExpropriationDataAfterThePrimeMinisterDecisionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationDataAfterThePrimeMinisterDecision = new ExpropriationDataAfterThePrimeMinisterDecision();
    this.selectedExpropriationDataAfterThePrimeMinisterDecision = this.selectedExpropriationDataAfterThePrimeMinisterDecisionDialog.data || this.selectedExpropriationDataAfterThePrimeMinisterDecision;

    
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


    this.expropriationDataAfterThePrimeMinisterDecisionForm = this.formBuilder.group({
      
  id : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.id],
  buildingCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.buildingCode, [ Validators.required ]],
  dateOfBecision : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfBecision, [ Validators.required ]],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfPublicationInTheOfficialGazette, [ Validators.required ]],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfPublicationInTheOfficialGazette, [ Validators.required ]],
  educationProject : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.educationProject, [ Validators.required ]],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.theNumberOfOwnersInThePresentationStatements, [ Validators.required ]],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.thePriceOfAMeterInTheSupplyStatements, [ Validators.required ]],
  dateFromThePresentationLists : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateFromThePresentationLists, [ Validators.required ]],
  dateToOfThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateToOfThePresentationStatements, [ Validators.required ]],
  numberOfSalesForms : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfSalesForms, [ Validators.required ]],
  branchCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.branchCode, [ Validators.required ]],
  resolutionNumber : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.resolutionNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.expropriationDataAfterThePrimeMinisterDecisionService.update(this.expropriationDataAfterThePrimeMinisterDecisionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.expropriationDataAfterThePrimeMinisterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.expropriationDataAfterThePrimeMinisterDecisionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
}
