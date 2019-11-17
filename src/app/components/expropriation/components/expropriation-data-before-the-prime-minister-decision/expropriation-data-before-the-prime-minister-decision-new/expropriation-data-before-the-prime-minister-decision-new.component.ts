
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExpropriationDataBeforeThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-before-the-prime-minister-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationDataBeforeThePrimeMinisterDecisionService } from '../shared/expropriation-data-before-the-prime-minister-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-data-before-the-prime-minister-decision-new',
  templateUrl: './expropriation-data-before-the-prime-minister-decision-new.component.html',
  styleUrls: ['./expropriation-data-before-the-prime-minister-decision-new.component.scss'],
  providers: [
    ]
})

export class ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent extends AppBaseComponent implements OnInit {
  expropriationDataBeforeThePrimeMinisterDecisionForm: FormGroup;
  @Input() selectedExpropriationDataBeforeThePrimeMinisterDecision: ExpropriationDataBeforeThePrimeMinisterDecision;
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
    @Optional() public dialogRef: MatDialogRef<ExpropriationDataBeforeThePrimeMinisterDecisionNewComponent>,
    public expropriationDataBeforeThePrimeMinisterDecisionService: ExpropriationDataBeforeThePrimeMinisterDecisionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationDataBeforeThePrimeMinisterDecision = new ExpropriationDataBeforeThePrimeMinisterDecision();

    
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
     
  id : [0],
  buildingCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.buildingCode, [ Validators.required ]],
  space : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.space, [ Validators.required ]],
  spaceBeforeRegulation : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceBeforeRegulation, [ Validators.required ]],
  spaceAfterOrganization : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.spaceAfterOrganization, [ Validators.required ]],
  usePosition : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.usePosition, [ Validators.required ]],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfTheConsultantSurveyReport, [ Validators.required ]],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerSquareMeterOfLandConsultantReport, [ Validators.required ]],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.priceOfTheBuildingConsultantReportArea, [ Validators.required ]],
  totalSurveyReport : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.totalSurveyReport, [ Validators.required ]],
  idIdealContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.idIdealContracts, [ Validators.required ]],
  numberMortgagecontractsParagon : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.numberMortgagecontractsParagon, [ Validators.required ]],
  historyOfParableContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.historyOfParableContracts, [ Validators.required ]],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.thePricePerSquareMeterOfTheLandContracts, [ Validators.required ]],
  dateOfPracticeRecord : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.dateOfPracticeRecord, [ Validators.required ]],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.pricePerMeterOfLandRecordOfPractice, [ Validators.required ]],
  initialCompensationAmount : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationAmount, [ Validators.required ]],
  initialCompensationCheckNumber : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationCheckNumber, [ Validators.required ]],
  initialCompensationDate : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.initialCompensationDate, [ Validators.required ]],
  branchCode : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.branchCode, [ Validators.required ]],
  typeOfRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.typeOfRemoval, [ Validators.required ]],
  applicantHandRemoval : [this.selectedExpropriationDataBeforeThePrimeMinisterDecision.applicantHandRemoval, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.expropriationDataBeforeThePrimeMinisterDecisionService.create(this.expropriationDataBeforeThePrimeMinisterDecisionForm.value)
        .pipe(switchMap(x => {
			return this.expropriationDataBeforeThePrimeMinisterDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
