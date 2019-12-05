
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordVariableCorrectionsForEmployees } from 'app/shared/models/record-variable-corrections-for-employees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordVariableCorrectionsForEmployeesService } from '../shared/record-variable-corrections-for-employees.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-variable-corrections-for-employees-view',
  templateUrl: './record-variable-corrections-for-employees-view.component.html',
  styleUrls: ['./record-variable-corrections-for-employees-view.component.scss'],
  providers: []
})

export class RecordVariableCorrectionsForEmployeesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordVariableCorrectionsForEmployees: RecordVariableCorrectionsForEmployees;
  recordVariableCorrectionsForEmployeesForm: FormGroup;

  private correctionTypesService: LookupService;

  
correctionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordVariableCorrectionsForEmployeesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordVariableCorrectionsForEmployeesViewComponent>,
    public recordVariableCorrectionsForEmployeesService: RecordVariableCorrectionsForEmployeesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordVariableCorrectionsForEmployees = this.selectedRecordVariableCorrectionsForEmployeesDialog.data || this.selectedRecordVariableCorrectionsForEmployees;

    
	this.correctionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصويب',
	});


    this.recordVariableCorrectionsForEmployeesForm = this.formBuilder.group({
      
  correctionNumber : [this.selectedRecordVariableCorrectionsForEmployees.correctionNumber],
  incomingMonth : [this.selectedRecordVariableCorrectionsForEmployees.incomingMonth],
  employeeCode : [this.selectedRecordVariableCorrectionsForEmployees.employeeCode],
  benefitsMonth : [this.selectedRecordVariableCorrectionsForEmployees.benefitsMonth],
  noteNumber : [this.selectedRecordVariableCorrectionsForEmployees.noteNumber],
  basicaSalary : [this.selectedRecordVariableCorrectionsForEmployees.basicaSalary],
  valuableEfforts : [this.selectedRecordVariableCorrectionsForEmployees.valuableEfforts],
  incentiveValue : [this.selectedRecordVariableCorrectionsForEmployees.incentiveValue],
  extraValue : [this.selectedRecordVariableCorrectionsForEmployees.extraValue],
  bonusValue : [this.selectedRecordVariableCorrectionsForEmployees.bonusValue],
  correctionCode : [this.selectedRecordVariableCorrectionsForEmployees.correctionCode]
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
    return this.recordVariableCorrectionsForEmployeesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordVariableCorrectionsForEmployeesForm.controls)) {
      this.recordVariableCorrectionsForEmployeesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
}

