
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExpropriationBeforeDecision } from 'app/shared/models/expropriation-before-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationBeforeDecisionService } from '../shared/expropriation-before-decision.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-before-decision-new',
  templateUrl: './expropriation-before-decision-new.component.html',
  styleUrls: ['./expropriation-before-decision-new.component.scss'],
  providers: [
    ]
})

export class ExpropriationBeforeDecisionNewComponent extends AppBaseComponent implements OnInit {
  expropriationBeforeDecisionForm: FormGroup;
  @Input() selectedExpropriationBeforeDecision: ExpropriationBeforeDecision;
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
    @Optional() public dialogRef: MatDialogRef<ExpropriationBeforeDecisionNewComponent>,
    public expropriationBeforeDecisionService: ExpropriationBeforeDecisionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationBeforeDecision = new ExpropriationBeforeDecision();

    
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
     
  id : [0],
  buildingCode : [this.selectedExpropriationBeforeDecision.buildingCode, [ Validators.required ]],
  space : [this.selectedExpropriationBeforeDecision.space, [ Validators.required ]],
  spaceBeforeRegulation : [this.selectedExpropriationBeforeDecision.spaceBeforeRegulation, [ Validators.required ]],
  spaceAfterOrganization : [this.selectedExpropriationBeforeDecision.spaceAfterOrganization, [ Validators.required ]],
  usePosition : [this.selectedExpropriationBeforeDecision.usePosition, [ Validators.required ]],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationBeforeDecision.dateOfTheConsultantSurveyReport, [ Validators.required ]],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationBeforeDecision.pricePerSquareMeterOfLandConsultantReport, [ Validators.required ]],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationBeforeDecision.priceOfTheBuildingConsultantReportArea, [ Validators.required ]],
  totalSurveyReport : [this.selectedExpropriationBeforeDecision.totalSurveyReport, [ Validators.required ]],
  idIdealContracts : [this.selectedExpropriationBeforeDecision.idIdealContracts, [ Validators.required ]],
  numberMortgagecontractsParagon : [this.selectedExpropriationBeforeDecision.numberMortgagecontractsParagon, [ Validators.required ]],
  historyOfParableContracts : [this.selectedExpropriationBeforeDecision.historyOfParableContracts, [ Validators.required ]],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationBeforeDecision.thePricePerSquareMeterOfTheLandContracts, [ Validators.required ]],
  dateOfPracticeRecord : [this.selectedExpropriationBeforeDecision.dateOfPracticeRecord, [ Validators.required ]],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationBeforeDecision.pricePerMeterOfLandRecordOfPractice, [ Validators.required ]],
  initialCompensationAmount : [this.selectedExpropriationBeforeDecision.initialCompensationAmount, [ Validators.required ]],
  initialCompensationCheckNumber : [this.selectedExpropriationBeforeDecision.initialCompensationCheckNumber, [ Validators.required ]],
  initialCompensationDate : [this.selectedExpropriationBeforeDecision.initialCompensationDate, [ Validators.required ]],
  branchCode : [this.selectedExpropriationBeforeDecision.branchCode, [ Validators.required ]],
  typeOfRemoval : [this.selectedExpropriationBeforeDecision.typeOfRemoval, [ Validators.required ]],
  applicantHandRemoval : [this.selectedExpropriationBeforeDecision.applicantHandRemoval, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.expropriationBeforeDecisionService.create(this.expropriationBeforeDecisionForm.value)
        .pipe(switchMap(x => {
			return this.expropriationBeforeDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.expropriationBeforeDecisionForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
 }
