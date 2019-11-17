
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExpropriationDataAfterThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-after-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationDataAfterThePrimeMinisterDecisionService } from '../shared/expropriation-data-after-the-prime-minister-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-data-after-the-prime-minister-decision-view',
  templateUrl: './expropriation-data-after-the-prime-minister-decision-view.component.html',
  styleUrls: ['./expropriation-data-after-the-prime-minister-decision-view.component.scss'],
  providers: []
})

export class ExpropriationDataAfterThePrimeMinisterDecisionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationDataAfterThePrimeMinisterDecision: ExpropriationDataAfterThePrimeMinisterDecision;
  expropriationDataAfterThePrimeMinisterDecisionForm: FormGroup;

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationDataAfterThePrimeMinisterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataAfterThePrimeMinisterDecisionViewComponent>,
    public expropriationDataAfterThePrimeMinisterDecisionService: ExpropriationDataAfterThePrimeMinisterDecisionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.buildingCode],
  dateOfBecision : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfBecision],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfPublicationInTheOfficialGazette],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateOfPublicationInTheOfficialGazette],
  educationProject : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.educationProject],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.theNumberOfOwnersInThePresentationStatements],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.thePriceOfAMeterInTheSupplyStatements],
  dateFromThePresentationLists : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateFromThePresentationLists],
  dateToOfThePresentationStatements : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.dateToOfThePresentationStatements],
  numberOfSalesForms : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.numberOfSalesForms],
  branchCode : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.branchCode],
  resolutionNumber : [this.selectedExpropriationDataAfterThePrimeMinisterDecision.resolutionNumber]
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
    return this.expropriationDataAfterThePrimeMinisterDecisionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.expropriationDataAfterThePrimeMinisterDecisionForm.controls)) {
      this.expropriationDataAfterThePrimeMinisterDecisionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
}

