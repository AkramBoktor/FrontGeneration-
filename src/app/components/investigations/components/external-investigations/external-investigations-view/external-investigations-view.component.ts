
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalInvestigations } from 'app/shared/models/external-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalInvestigationsService } from '../shared/external-investigations.service';

@Component({
  selector: 'app-external-investigations-view',
  templateUrl: './external-investigations-view.component.html',
  styleUrls: ['./external-investigations-view.component.scss'],
  providers: []
})

export class ExternalInvestigationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalInvestigations: ExternalInvestigations;
  externalInvestigationsForm: FormGroup;

  private branchCodesService: LookupService;
private statusCodesService: LookupService;
private departmentsSectionsService: LookupService;
private violationsService: LookupService;
private classificationInstructionCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
actionCodeSelectOptions: MaterialSelectOptions;
referralFromSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
categorySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalInvestigationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalInvestigationsViewComponent>,
    public externalInvestigationsService: ExternalInvestigationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalInvestigations = this.selectedExternalInvestigationsDialog.data || this.selectedExternalInvestigations;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.actionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحالة',
	});

	this.referralFromSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهة طالبة التحقيق',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.classificationInstructionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});


    this.externalInvestigationsForm = this.formBuilder.group({
      
  fileNumber : [this.selectedExternalInvestigations.fileNumber],
  investigatedReferralDate : [this.selectedExternalInvestigations.investigatedReferralDate],
  lawyerCode : [this.selectedExternalInvestigations.lawyerCode],
  investigationSubject : [this.selectedExternalInvestigations.investigationSubject],
  caseNumber : [this.selectedExternalInvestigations.caseNumber],
  receivedDate : [this.selectedExternalInvestigations.receivedDate],
  prosecutionDocumentReviewDate : [this.selectedExternalInvestigations.prosecutionDocumentReviewDate],
  submissionCompetentDate : [this.selectedExternalInvestigations.submissionCompetentDate],
  competentAuthorityDate : [this.selectedExternalInvestigations.competentAuthorityDate],
  centralAgencyInvestigationSubmittedDate : [this.selectedExternalInvestigations.centralAgencyInvestigationSubmittedDate],
  centralAgencyReplyDate : [this.selectedExternalInvestigations.centralAgencyReplyDate],
  savedFileDate : [this.selectedExternalInvestigations.savedFileDate],
  employeeCode : [this.selectedExternalInvestigations.employeeCode],
  employeeName : [this.selectedExternalInvestigations.employeeName],
  branchCode : [this.selectedExternalInvestigations.branchCode],
  actionCode : [this.selectedExternalInvestigations.actionCode],
  referralFrom : [this.selectedExternalInvestigations.referralFrom],
  violationCode : [this.selectedExternalInvestigations.violationCode],
  category : [this.selectedExternalInvestigations.category]
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
    return this.externalInvestigationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.externalInvestigationsForm.controls)) {
      this.externalInvestigationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.violationsService = new LookupService('violations', this.http);
this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
  }
}

