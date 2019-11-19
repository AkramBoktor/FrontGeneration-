
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InternalInvestigations } from 'app/shared/models/internal-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { InternalInvestigationsService } from '../shared/internal-investigations.service';




@Component({
  selector: 'app-internal-investigations-edit',
  templateUrl: './internal-investigations-edit.component.html',
  styleUrls: ['./internal-investigations-edit.component.scss'],
  providers: []
})

export class InternalInvestigationsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInternalInvestigations: InternalInvestigations;
  internalInvestigationsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private classificationInstructionCodesService: LookupService;
private violationsService: LookupService;
private departmentsSectionsService: LookupService;
private proceduresCodesService: LookupService;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInternalInvestigationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<InternalInvestigationsEditComponent>,
    public internalInvestigationsService: InternalInvestigationsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInternalInvestigations = new InternalInvestigations();
    this.selectedInternalInvestigations = this.selectedInternalInvestigationsDialog.data || this.selectedInternalInvestigations;

    
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
	 data: this.proceduresCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاجراء',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.internalInvestigationsForm = this.formBuilder.group({
      
  id : [this.selectedInternalInvestigations.id],
  fileNumber : [this.selectedInternalInvestigations.fileNumber, [ Validators.required ]],
  savedFileDate : [this.selectedInternalInvestigations.savedFileDate, [ Validators.required ]],
  centralAgencyReplyDate : [this.selectedInternalInvestigations.centralAgencyReplyDate, [ Validators.required ]],
  centralAgencyInvestigationSubmittedDate : [this.selectedInternalInvestigations.centralAgencyInvestigationSubmittedDate, [ Validators.required ]],
  competentAuthorityDate : [this.selectedInternalInvestigations.competentAuthorityDate, [ Validators.required ]],
  investigationDocumentExpiryDate : [this.selectedInternalInvestigations.investigationDocumentExpiryDate, [ Validators.required ]],
  attorneyReceiptDate : [this.selectedInternalInvestigations.attorneyReceiptDate, [ Validators.required ]],
  referralInvestigationsDate : [this.selectedInternalInvestigations.referralInvestigationsDate, [ Validators.required ]],
  investigationSubject : [this.selectedInternalInvestigations.investigationSubject, [ Validators.required ]],
  lawyerCode : [this.selectedInternalInvestigations.lawyerCode, [ Validators.required ]],
  investigatedReferralDate : [this.selectedInternalInvestigations.investigatedReferralDate, [ Validators.required ]],
  employeeCode : [this.selectedInternalInvestigations.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedInternalInvestigations.employeeName, [ ]],
  category : [this.selectedInternalInvestigations.category, [ Validators.required ]],
  violationCode : [this.selectedInternalInvestigations.violationCode, [ Validators.required ]],
  referralFrom : [this.selectedInternalInvestigations.referralFrom, [ Validators.required ]],
  actionCode : [this.selectedInternalInvestigations.actionCode, [ Validators.required ]],
  branchCode : [this.selectedInternalInvestigations.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.internalInvestigationsService.update(this.internalInvestigationsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.internalInvestigationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.internalInvestigationsForm.get(name);
  }

  initializeLookupServices() {
    this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
this.violationsService = new LookupService('violations', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.proceduresCodesService = new LookupService('procedurescodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
