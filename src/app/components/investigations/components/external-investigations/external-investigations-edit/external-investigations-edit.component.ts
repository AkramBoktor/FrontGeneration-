
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalInvestigations } from 'app/shared/models/external-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ExternalInvestigationsService } from '../shared/external-investigations.service';




@Component({
  selector: 'app-external-investigations-edit',
  templateUrl: './external-investigations-edit.component.html',
  styleUrls: ['./external-investigations-edit.component.scss'],
  providers: []
})

export class ExternalInvestigationsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalInvestigations: ExternalInvestigations;
  externalInvestigationsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private classificationInstructionCodesService: LookupService;
private violationsService: LookupService;
private departmentsSectionsService: LookupService;
private statusCodesService: LookupService;
private branchCodesService: LookupService;

  
categorySelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
referralFromSelectOptions: MaterialSelectOptions;
actionCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;
	@ViewChild('violationCode', { static: true }) ViolationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('referralFrom', { static: true }) ReferralFromSelectComponent: MaterialSelectComponent;
	@ViewChild('actionCode', { static: true }) ActionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalInvestigationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalInvestigationsEditComponent>,
    public externalInvestigationsService: ExternalInvestigationsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalInvestigations = new ExternalInvestigations();
    this.selectedExternalInvestigations = this.selectedExternalInvestigationsDialog.data || this.selectedExternalInvestigations;

    
	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.classificationInstructionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.referralFromSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهة طالبة التحقيق',
	});

	this.actionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحالة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.externalInvestigationsForm = this.formBuilder.group({
      
  id : [this.selectedExternalInvestigations.id],
  fileNumber : [this.selectedExternalInvestigations.fileNumber, [ Validators.required ]],
  savedFileDate : [this.selectedExternalInvestigations.savedFileDate, [ Validators.required ]],
  centralAgencyReplyDate : [this.selectedExternalInvestigations.centralAgencyReplyDate, [ Validators.required ]],
  centralAgencyInvestigationSubmittedDate : [this.selectedExternalInvestigations.centralAgencyInvestigationSubmittedDate, [ Validators.required ]],
  competentAuthorityDate : [this.selectedExternalInvestigations.competentAuthorityDate, [ Validators.required ]],
  submissionCompetentDate : [this.selectedExternalInvestigations.submissionCompetentDate, [ Validators.required ]],
  employeeCode : [this.selectedExternalInvestigations.employeeCode, [ Validators.required ]],
  prosecutionDocumentReviewDate : [this.selectedExternalInvestigations.prosecutionDocumentReviewDate, [ Validators.required ]],
  caseNumber : [this.selectedExternalInvestigations.caseNumber, [ Validators.required ]],
  investigationSubject : [this.selectedExternalInvestigations.investigationSubject, [ Validators.required ]],
  lawyerCode : [this.selectedExternalInvestigations.lawyerCode, [ Validators.required ]],
  investigatedReferralDate : [this.selectedExternalInvestigations.investigatedReferralDate, [ Validators.required ]],
  receivedDate : [this.selectedExternalInvestigations.receivedDate, [ Validators.required ]],
  employeeName : [this.selectedExternalInvestigations.employeeName, [ ]],
  category : [this.selectedExternalInvestigations.category, [ Validators.required ]],
  violationCode : [this.selectedExternalInvestigations.violationCode, [ Validators.required ]],
  referralFrom : [this.selectedExternalInvestigations.referralFrom, [ Validators.required ]],
  actionCode : [this.selectedExternalInvestigations.actionCode, [ Validators.required ]],
  branchCode : [this.selectedExternalInvestigations.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.externalInvestigationsService.update(this.externalInvestigationsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.externalInvestigationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.externalInvestigationsForm.get(name);
  }

  initializeLookupServices() {
    this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
this.violationsService = new LookupService('violations', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
