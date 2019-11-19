
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExpropriationBeforeDecision } from 'app/shared/models/expropriation-before-decision';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExpropriationBeforeDecisionService } from '../shared/expropriation-before-decision.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-expropriation-before-decision-edit',
  templateUrl: './expropriation-before-decision-edit.component.html',
  styleUrls: ['./expropriation-before-decision-edit.component.scss'],
  providers: []
})

export class ExpropriationBeforeDecisionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExpropriationBeforeDecision: ExpropriationBeforeDecision;
  expropriationBeforeDecisionForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExpropriationBeforeDecisionDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExpropriationBeforeDecisionEditComponent>,
    public expropriationBeforeDecisionService: ExpropriationBeforeDecisionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExpropriationBeforeDecision = new ExpropriationBeforeDecision();
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
      
  id : [this.selectedExpropriationBeforeDecision.id],
  initialCompensationCheckNumber : [this.selectedExpropriationBeforeDecision.initialCompensationCheckNumber, [ Validators.required ]],
  initialCompensationAmount : [this.selectedExpropriationBeforeDecision.initialCompensationAmount, [ Validators.required ]],
  pricePerMeterOfLandRecordOfPractice : [this.selectedExpropriationBeforeDecision.pricePerMeterOfLandRecordOfPractice, [ Validators.required ]],
  dateOfPracticeRecord : [this.selectedExpropriationBeforeDecision.dateOfPracticeRecord, [ Validators.required ]],
  thePricePerSquareMeterOfTheLandContracts : [this.selectedExpropriationBeforeDecision.thePricePerSquareMeterOfTheLandContracts, [ Validators.required ]],
  historyOfParableContracts : [this.selectedExpropriationBeforeDecision.historyOfParableContracts, [ Validators.required ]],
  numberMortgagecontractsParagon : [this.selectedExpropriationBeforeDecision.numberMortgagecontractsParagon, [ Validators.required ]],
  idIdealContracts : [this.selectedExpropriationBeforeDecision.idIdealContracts, [ Validators.required ]],
  initialCompensationDate : [this.selectedExpropriationBeforeDecision.initialCompensationDate, [ Validators.required ]],
  totalSurveyReport : [this.selectedExpropriationBeforeDecision.totalSurveyReport, [ Validators.required ]],
  pricePerSquareMeterOfLandConsultantReport : [this.selectedExpropriationBeforeDecision.pricePerSquareMeterOfLandConsultantReport, [ Validators.required ]],
  dateOfTheConsultantSurveyReport : [this.selectedExpropriationBeforeDecision.dateOfTheConsultantSurveyReport, [ Validators.required ]],
  usePosition : [this.selectedExpropriationBeforeDecision.usePosition, [ Validators.required ]],
  spaceAfterOrganization : [this.selectedExpropriationBeforeDecision.spaceAfterOrganization, [ Validators.required ]],
  spaceBeforeRegulation : [this.selectedExpropriationBeforeDecision.spaceBeforeRegulation, [ Validators.required ]],
  space : [this.selectedExpropriationBeforeDecision.space, [ Validators.required ]],
  buildingCode : [this.selectedExpropriationBeforeDecision.buildingCode, [ Validators.required ]],
  priceOfTheBuildingConsultantReportArea : [this.selectedExpropriationBeforeDecision.priceOfTheBuildingConsultantReportArea, [ Validators.required ]],
  branchCode : [this.selectedExpropriationBeforeDecision.branchCode, [ Validators.required ]],
  typeOfRemoval : [this.selectedExpropriationBeforeDecision.typeOfRemoval, [ Validators.required ]],
  applicantHandRemoval : [this.selectedExpropriationBeforeDecision.applicantHandRemoval, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.expropriationBeforeDecisionService.update(this.expropriationBeforeDecisionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.expropriationBeforeDecisionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.expropriationBeforeDecisionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
}
