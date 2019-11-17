
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndingTheAssignmentOfTheCaseToTheLawyer } from 'app/shared/models/ending-the-assignment-of-the-case-to-the-lawyer';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndingTheAssignmentOfTheCaseToTheLawyerService } from '../shared/ending-the-assignment-of-the-case-to-the-lawyer.service';

@Component({
  selector: 'app-ending-the-assignment-of-the-case-to-the-lawyer-view',
  templateUrl: './ending-the-assignment-of-the-case-to-the-lawyer-view.component.html',
  styleUrls: ['./ending-the-assignment-of-the-case-to-the-lawyer-view.component.scss'],
  providers: []
})

export class EndingTheAssignmentOfTheCaseToTheLawyerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndingTheAssignmentOfTheCaseToTheLawyer: EndingTheAssignmentOfTheCaseToTheLawyer;
  endingTheAssignmentOfTheCaseToTheLawyerForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private issueCodeIssuesService: LookupService;
private terminationOfAttorneyAttorneyReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
caseReasonSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndingTheAssignmentOfTheCaseToTheLawyerDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndingTheAssignmentOfTheCaseToTheLawyerViewComponent>,
    public endingTheAssignmentOfTheCaseToTheLawyerService: EndingTheAssignmentOfTheCaseToTheLawyerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndingTheAssignmentOfTheCaseToTheLawyer = this.selectedEndingTheAssignmentOfTheCaseToTheLawyerDialog.data || this.selectedEndingTheAssignmentOfTheCaseToTheLawyer;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.caseReasonSelectOptions = new MaterialSelectOptions({
	 data: this.terminationOfAttorneyAttorneyReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء اسناد القضية',
	});


    this.endingTheAssignmentOfTheCaseToTheLawyerForm = this.formBuilder.group({
      
  fileNumber : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.fileNumber],
  lawsuitNumber : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.lawsuitNumber],
  year : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.year],
  incomingDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.incomingDate],
  employeeCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.employeeCode],
  directorAssignmentDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.directorAssignmentDate],
  lawyerExpiryDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.lawyerExpiryDate],
  branchCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.branchCode],
  entityType : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.entityType],
  entityCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.entityCode],
  issueCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.issueCode],
  caseReason : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.caseReason]
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
    return this.endingTheAssignmentOfTheCaseToTheLawyerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.endingTheAssignmentOfTheCaseToTheLawyerForm.controls)) {
      this.endingTheAssignmentOfTheCaseToTheLawyerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.terminationOfAttorneyAttorneyReasonsService = new LookupService('terminationofattorneyattorneyreasons', this.http);
  }
}

