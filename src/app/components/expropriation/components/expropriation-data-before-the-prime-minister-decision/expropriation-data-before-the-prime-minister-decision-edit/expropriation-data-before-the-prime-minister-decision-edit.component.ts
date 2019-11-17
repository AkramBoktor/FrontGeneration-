
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExpropriationDataBeforeThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-before-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExpropriationDataBeforeThePrimeMinisterDecisionService } from '../shared/expropriation-data-before-the-prime-minister-decision.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-data-before-the-prime-minister-decision-edit',
  templateUrl: './expropriation-data-before-the-prime-minister-decision-edit.component.html',
  styleUrls: ['./expropriation-data-before-the-prime-minister-decision-edit.component.scss'],
  providers: []
})

export class ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationDataBeforeThePrimeMinisterDecision: ExpropriationDataBeforeThePrimeMinisterDecision;
  expropriationDataBeforeThePrimeMinisterDecisionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private removalTypesService: LookupService;
private removalApplicantsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
typeOfRemovalSelectOptions: MaterialSelectOptions;
applicantHandRemovalSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfRemoval', { static: true }) TypeOfRemovalSelectComponent: MaterialSelectComponent;
	@ViewChild('applicantHandRemoval', { static: true }) ApplicantHandRemovalSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationDataBeforeThePrimeMinisterDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataBeforeThePrimeMinisterDecisionEditComponent>,
    public expropriationDataBeforeThePrimeMinisterDecisionService: ExpropriationDataBeforeThePrimeMinisterDecisionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationDataBeforeThePrimeMinisterDecision = new ExpropriationDataBeforeThePrimeMinisterDecision();
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
      
  id : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.id],
  initialCompensationCheckNumber : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationCheckNumber, [ Validators.required ]],
  initialCompensationAmount : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationAmount, [ Validators.required ]],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerMeterOfLandRecordOfPractice, [ Validators.required ]],
  dateOfPracticeRecord : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfPracticeRecord, [ Validators.required ]],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.thePricePerSquareMeterOfTheLandContracts, [ Validators.required ]],
  historyOfParableContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.historyOfParableContracts, [ Validators.required ]],
  numberMortgagecontractsParagon : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.numberMortgagecontractsParagon, [ Validators.required ]],
  idIdealContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.idIdealContracts, [ Validators.required ]],
  initialCompensationDate : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationDate, [ Validators.required ]],
  totalSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.totalSurveyReport, [ Validators.required ]],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerSquareMeterOfLandConsultantReport, [ Validators.required ]],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfTheConsultantSurveyReport, [ Validators.required ]],
  usePosition : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.usePosition, [ Validators.required ]],
  spaceAfterOrganization : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceAfterOrganization, [ Validators.required ]],
  spaceBeforeRegulation : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceBeforeRegulation, [ Validators.required ]],
  space : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.space, [ Validators.required ]],
  buildingCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.buildingCode, [ Validators.required ]],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.priceOfTheBuildingConsultantReportArea, [ Validators.required ]],
  branchCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.branchCode, [ Validators.required ]],
  typeOfRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.typeOfRemoval, [ Validators.required ]],
  applicantHandRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.applicantHandRemoval, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.expropriationDataBeforeThePrimeMinisterDecisionService.update(this.expropriationDataBeforeThePrimeMinisterDecisionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.expropriationDataBeforeThePrimeMinisterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.expropriationDataBeforeThePrimeMinisterDecisionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
}
