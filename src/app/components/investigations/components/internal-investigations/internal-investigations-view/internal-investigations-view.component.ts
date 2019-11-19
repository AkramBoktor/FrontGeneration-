
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InternalInvestigations } from 'app/shared/models/internal-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InternalInvestigationsService } from '../shared/internal-investigations.service';

@Component({
  selector: 'app-internal-investigations-view',
  templateUrl: './internal-investigations-view.component.html',
  styleUrls: ['./internal-investigations-view.component.scss'],
  providers: []
})

export class InternalInvestigationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInternalInvestigations: InternalInvestigations;
  internalInvestigationsForm: FormGroup;

  private branchCodesService: LookupService;
private proceduresCodesService: LookupService;
private departmentsSectionsService: LookupService;
private violationsService: LookupService;
private classificationInstructionCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
actionCodeSelectOptions: MaterialSelectOptions;
referralFromSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
categorySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInternalInvestigationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<InternalInvestigationsViewComponent>,
    public internalInvestigationsService: InternalInvestigationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInternalInvestigations = this.selectedInternalInvestigationsDialog.data || this.selectedInternalInvestigations;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.actionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.proceduresCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاجراء',
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


    this.internalInvestigationsForm = this.formBuilder.group({
      
  fileNumber : [this.selectedInternalInvestigations.fileNumber],
  investigatedReferralDate : [this.selectedInternalInvestigations.investigatedReferralDate],
  lawyerCode : [this.selectedInternalInvestigations.lawyerCode],
  investigationSubject : [this.selectedInternalInvestigations.investigationSubject],
  referralInvestigationsDate : [this.selectedInternalInvestigations.referralInvestigationsDate],
  attorneyReceiptDate : [this.selectedInternalInvestigations.attorneyReceiptDate],
  investigationDocumentExpiryDate : [this.selectedInternalInvestigations.investigationDocumentExpiryDate],
  competentAuthorityDate : [this.selectedInternalInvestigations.competentAuthorityDate],
  centralAgencyInvestigationSubmittedDate : [this.selectedInternalInvestigations.centralAgencyInvestigationSubmittedDate],
  centralAgencyReplyDate : [this.selectedInternalInvestigations.centralAgencyReplyDate],
  savedFileDate : [this.selectedInternalInvestigations.savedFileDate],
  employeeCode : [this.selectedInternalInvestigations.employeeCode],
  employeeName : [this.selectedInternalInvestigations.employeeName],
  branchCode : [this.selectedInternalInvestigations.branchCode],
  actionCode : [this.selectedInternalInvestigations.actionCode],
  referralFrom : [this.selectedInternalInvestigations.referralFrom],
  violationCode : [this.selectedInternalInvestigations.violationCode],
  category : [this.selectedInternalInvestigations.category]
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
    return this.internalInvestigationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.internalInvestigationsForm.controls)) {
      this.internalInvestigationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.proceduresCodesService = new LookupService('procedurescodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.violationsService = new LookupService('violations', this.http);
this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
  }
}

