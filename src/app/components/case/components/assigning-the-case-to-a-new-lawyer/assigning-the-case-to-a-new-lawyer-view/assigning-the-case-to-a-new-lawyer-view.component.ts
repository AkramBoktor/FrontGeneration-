
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssigningTheCaseToANewLawyer } from 'app/shared/models/assigning-the-case-to-a-new-lawyer';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssigningTheCaseToANewLawyerService } from '../shared/assigning-the-case-to-a-new-lawyer.service';

@Component({
  selector: 'app-assigning-the-case-to-a-new-lawyer-view',
  templateUrl: './assigning-the-case-to-a-new-lawyer-view.component.html',
  styleUrls: ['./assigning-the-case-to-a-new-lawyer-view.component.scss'],
  providers: []
})

export class AssigningTheCaseToANewLawyerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssigningTheCaseToANewLawyer: AssigningTheCaseToANewLawyer;
  assigningTheCaseToANewLawyerForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private issueCodeIssuesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssigningTheCaseToANewLawyerDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssigningTheCaseToANewLawyerViewComponent>,
    public assigningTheCaseToANewLawyerService: AssigningTheCaseToANewLawyerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssigningTheCaseToANewLawyer = this.selectedAssigningTheCaseToANewLawyerDialog.data || this.selectedAssigningTheCaseToANewLawyer;

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});


    this.assigningTheCaseToANewLawyerForm = this.formBuilder.group({
      
  fileNumber : [this.selectedAssigningTheCaseToANewLawyer.fileNumber],
  lawsuitNumber : [this.selectedAssigningTheCaseToANewLawyer.lawsuitNumber],
  year : [this.selectedAssigningTheCaseToANewLawyer.year],
  incomingDate : [this.selectedAssigningTheCaseToANewLawyer.incomingDate],
  employeeCode : [this.selectedAssigningTheCaseToANewLawyer.employeeCode],
  receiptAttorneyDate : [this.selectedAssigningTheCaseToANewLawyer.receiptAttorneyDate],
  branchCode : [this.selectedAssigningTheCaseToANewLawyer.branchCode],
  entityType : [this.selectedAssigningTheCaseToANewLawyer.entityType],
  issueCode : [this.selectedAssigningTheCaseToANewLawyer.issueCode]
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
    return this.assigningTheCaseToANewLawyerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assigningTheCaseToANewLawyerForm.controls)) {
      this.assigningTheCaseToANewLawyerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
  }
}

