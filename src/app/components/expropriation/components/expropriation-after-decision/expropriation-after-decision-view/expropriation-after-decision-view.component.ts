
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExpropriationAfterDecision } from 'app/shared/models/expropriation-after-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationAfterDecisionService } from '../shared/expropriation-after-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-after-decision-view',
  templateUrl: './expropriation-after-decision-view.component.html',
  styleUrls: ['./expropriation-after-decision-view.component.scss'],
  providers: []
})

export class ExpropriationAfterDecisionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationAfterDecision: ExpropriationAfterDecision;
  expropriationAfterDecisionForm: FormGroup;

  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationAfterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationAfterDecisionViewComponent>,
    public expropriationAfterDecisionService: ExpropriationAfterDecisionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedExpropriationAfterDecision.buildingCode],
  dateOfBecision : [this.selectedExpropriationAfterDecision.dateOfBecision],
  numberOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.numberOfPublicationInTheOfficialGazette],
  dateOfPublicationInTheOfficialGazette : [this.selectedExpropriationAfterDecision.dateOfPublicationInTheOfficialGazette],
  educationProject : [this.selectedExpropriationAfterDecision.educationProject],
  theNumberOfOwnersInThePresentationStatements : [this.selectedExpropriationAfterDecision.theNumberOfOwnersInThePresentationStatements],
  thePriceOfAMeterInTheSupplyStatements : [this.selectedExpropriationAfterDecision.thePriceOfAMeterInTheSupplyStatements],
  dateFromThePresentationLists : [this.selectedExpropriationAfterDecision.dateFromThePresentationLists],
  dateToOfThePresentationStatements : [this.selectedExpropriationAfterDecision.dateToOfThePresentationStatements],
  numberOfSalesForms : [this.selectedExpropriationAfterDecision.numberOfSalesForms],
  branchCode : [this.selectedExpropriationAfterDecision.branchCode],
  resolutionNumber : [this.selectedExpropriationAfterDecision.resolutionNumber]
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
    return this.expropriationAfterDecisionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.expropriationAfterDecisionForm.controls)) {
      this.expropriationAfterDecisionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
}

