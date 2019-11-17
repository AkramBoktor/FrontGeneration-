
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExpropriationDataBeforeThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-before-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationDataBeforeThePrimeMinisterDecisionService } from '../shared/expropriation-data-before-the-prime-minister-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-data-before-the-prime-minister-decision-view',
  templateUrl: './expropriation-data-before-the-prime-minister-decision-view.component.html',
  styleUrls: ['./expropriation-data-before-the-prime-minister-decision-view.component.scss'],
  providers: []
})

export class ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationDataBeforeThePrimeMinisterDecision: ExpropriationDataBeforeThePrimeMinisterDecision;
  expropriationDataBeforeThePrimeMinisterDecisionForm: FormGroup;

  private branchCodesService: LookupService;
private removalTypesService: LookupService;
private removalApplicantsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
typeOfRemovalSelectOptions: MaterialSelectOptions;
applicantHandRemovalSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationDataBeforeThePrimeMinisterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataBeforeThePrimeMinisterDecisionViewComponent>,
    public expropriationDataBeforeThePrimeMinisterDecisionService: ExpropriationDataBeforeThePrimeMinisterDecisionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationDataBeforeThePrimeMinisterDecision = this.selectedExpropriationDataBeforeThePrimeMinisterDecisionDialog.data || this.selectedExpropriationDataBeforeThePrimeMinisterDecision;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.typeOfRemovalSelectOptions = new MaterialSelectOptions({
	 data: this.removalTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النزع',
	});

	this.applicantHandRemovalSelectOptions = new MaterialSelectOptions({
	 data: this.removalApplicantsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة طالبة النزع',
	});


    this.expropriationDataBeforeThePrimeMinisterDecisionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.buildingCode],
  space : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.space],
  spaceBeforeRegulation : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceBeforeRegulation],
  spaceAfterOrganization : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceAfterOrganization],
  usePosition : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.usePosition],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfTheConsultantSurveyReport],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerSquareMeterOfLandConsultantReport],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.priceOfTheBuildingConsultantReportArea],
  totalSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.totalSurveyReport],
  idIdealContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.idIdealContracts],
  numberMortgagecontractsParagon : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.numberMortgagecontractsParagon],
  historyOfParableContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.historyOfParableContracts],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.thePricePerSquareMeterOfTheLandContracts],
  dateOfPracticeRecord : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfPracticeRecord],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerMeterOfLandRecordOfPractice],
  initialCompensationAmount : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationAmount],
  initialCompensationCheckNumber : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationCheckNumber],
  initialCompensationDate : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationDate],
  branchCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.branchCode],
  typeOfRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.typeOfRemoval],
  applicantHandRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.applicantHandRemoval]
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
    return this.expropriationDataBeforeThePrimeMinisterDecisionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.expropriationDataBeforeThePrimeMinisterDecisionForm.controls)) {
      this.expropriationDataBeforeThePrimeMinisterDecisionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
}

