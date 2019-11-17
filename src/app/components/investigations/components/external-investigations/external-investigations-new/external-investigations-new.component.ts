
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalInvestigations } from 'app/shared/models/external-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ExternalInvestigationsService } from '../shared/external-investigations.service';


@Component({
  selector: 'app-external-investigations-new',
  templateUrl: './external-investigations-new.component.html',
  styleUrls: ['./external-investigations-new.component.scss'],
  providers: [
    ]
})

export class ExternalInvestigationsNewComponent extends AppBaseComponent implements OnInit {
  externalInvestigationsForm: FormGroup;
  @Input() selectedExternalInvestigations: ExternalInvestigations;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('actionCode', { static: true }) ActionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('referralFrom', { static: true }) ReferralFromSelectComponent: MaterialSelectComponent;
	@ViewChild('violationCode', { static: true }) ViolationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExternalInvestigationsNewComponent>,
    public externalInvestigationsService: ExternalInvestigationsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalInvestigations = new ExternalInvestigations();

    
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
     
  id : [0],
  fileNumber : [this.selectedExternalInvestigations.fileNumber, [ Validators.required ]],
  investigatedReferralDate : [this.selectedExternalInvestigations.investigatedReferralDate, [ Validators.required ]],
  lawyerCode : [this.selectedExternalInvestigations.lawyerCode, [ Validators.required ]],
  investigationSubject : [this.selectedExternalInvestigations.investigationSubject, [ Validators.required ]],
  caseNumber : [this.selectedExternalInvestigations.caseNumber, [ Validators.required ]],
  receivedDate : [this.selectedExternalInvestigations.receivedDate, [ Validators.required ]],
  prosecutionDocumentReviewDate : [this.selectedExternalInvestigations.prosecutionDocumentReviewDate, [ Validators.required ]],
  submissionCompetentDate : [this.selectedExternalInvestigations.submissionCompetentDate, [ Validators.required ]],
  competentAuthorityDate : [this.selectedExternalInvestigations.competentAuthorityDate, [ Validators.required ]],
  centralAgencyInvestigationSubmittedDate : [this.selectedExternalInvestigations.centralAgencyInvestigationSubmittedDate, [ Validators.required ]],
  centralAgencyReplyDate : [this.selectedExternalInvestigations.centralAgencyReplyDate, [ Validators.required ]],
  savedFileDate : [this.selectedExternalInvestigations.savedFileDate, [ Validators.required ]],
  employeeCode : [this.selectedExternalInvestigations.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedExternalInvestigations.employeeName, [ ]],
  branchCode : [this.selectedExternalInvestigations.branchCode, [ Validators.required ]],
  actionCode : [this.selectedExternalInvestigations.actionCode, [ Validators.required ]],
  referralFrom : [this.selectedExternalInvestigations.referralFrom, [ Validators.required ]],
  violationCode : [this.selectedExternalInvestigations.violationCode, [ Validators.required ]],
  category : [this.selectedExternalInvestigations.category, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.externalInvestigationsService.create(this.externalInvestigationsForm.value)
        .pipe(switchMap(x => {
			return this.externalInvestigationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.externalInvestigationsForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.violationsService = new LookupService('violations', this.http);
this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
  }
 }
