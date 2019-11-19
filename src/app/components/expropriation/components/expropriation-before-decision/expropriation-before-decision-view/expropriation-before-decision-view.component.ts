
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExpropriationBeforeDecision } from 'app/shared/models/expropriation-before-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationBeforeDecisionService } from '../shared/expropriation-before-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-before-decision-view',
  templateUrl: './expropriation-before-decision-view.component.html',
  styleUrls: ['./expropriation-before-decision-view.component.scss'],
  providers: []
})

export class ExpropriationBeforeDecisionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationBeforeDecision: ExpropriationBeforeDecision;
  expropriationBeforeDecisionForm: FormGroup;

  private branchCodesService: LookupService;
private removalTypesService: LookupService;
private removalApplicantsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
typeOfRemovalSelectOptions: MaterialSelectOptions;
applicantHandRemovalSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationBeforeDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationBeforeDecisionViewComponent>,
    public expropriationBeforeDecisionService: ExpropriationBeforeDecisionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationBeforeDecision = this.selectedExpropriationBeforeDecisionDialog.data || this.selectedExpropriationBeforeDecision;

    
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


    this.expropriationBeforeDecisionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedExpropriationBeforeDecision.buildingCode],
  space : [this.selectedExpropriationBeforeDecision.space],
  spaceBeforeRegulation : [this.selectedExpropriationBeforeDecision.spaceBeforeRegulation],
  spaceAfterOrganization : [this.selectedExpropriationBeforeDecision.spaceAfterOrganization],
  usePosition : [this.selectedExpropriationBeforeDecision.usePosition],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationBeforeDecision.dateOfTheConsultantSurveyReport],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationBeforeDecision.pricePerSquareMeterOfLandConsultantReport],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationBeforeDecision.priceOfTheBuildingConsultantReportArea],
  totalSurveyReport : [this.selectedExpropriationBeforeDecision.totalSurveyReport],
  idIdealContracts : [this.selectedExpropriationBeforeDecision.idIdealContracts],
  numberMortgagecontractsParagon : [this.selectedExpropriationBeforeDecision.numberMortgagecontractsParagon],
  historyOfParableContracts : [this.selectedExpropriationBeforeDecision.historyOfParableContracts],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationBeforeDecision.thePricePerSquareMeterOfTheLandContracts],
  dateOfPracticeRecord : [this.selectedExpropriationBeforeDecision.dateOfPracticeRecord],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationBeforeDecision.pricePerMeterOfLandRecordOfPractice],
  initialCompensationAmount : [this.selectedExpropriationBeforeDecision.initialCompensationAmount],
  initialCompensationCheckNumber : [this.selectedExpropriationBeforeDecision.initialCompensationCheckNumber],
  initialCompensationDate : [this.selectedExpropriationBeforeDecision.initialCompensationDate],
  branchCode : [this.selectedExpropriationBeforeDecision.branchCode],
  typeOfRemoval : [this.selectedExpropriationBeforeDecision.typeOfRemoval],
  applicantHandRemoval : [this.selectedExpropriationBeforeDecision.applicantHandRemoval]
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
    return this.expropriationBeforeDecisionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.expropriationBeforeDecisionForm.controls)) {
      this.expropriationBeforeDecisionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
}

