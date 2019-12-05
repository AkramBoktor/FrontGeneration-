
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordVariableCorrectionsForEmployees } from 'app/shared/models/record-variable-corrections-for-employees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordVariableCorrectionsForEmployeesService } from '../shared/record-variable-corrections-for-employees.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-variable-corrections-for-employees-edit',
  templateUrl: './record-variable-corrections-for-employees-edit.component.html',
  styleUrls: ['./record-variable-corrections-for-employees-edit.component.scss'],
  providers: []
})

export class RecordVariableCorrectionsForEmployeesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordVariableCorrectionsForEmployees: RecordVariableCorrectionsForEmployees;
  recordVariableCorrectionsForEmployeesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private correctionTypesService: LookupService;

  
correctionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionCode', { static: true }) CorrectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordVariableCorrectionsForEmployeesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordVariableCorrectionsForEmployeesEditComponent>,
    public recordVariableCorrectionsForEmployeesService: RecordVariableCorrectionsForEmployeesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordVariableCorrectionsForEmployees = new RecordVariableCorrectionsForEmployees();
    this.selectedRecordVariableCorrectionsForEmployees = this.selectedRecordVariableCorrectionsForEmployeesDialog.data || this.selectedRecordVariableCorrectionsForEmployees;

    
	this.correctionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصويب',
	});


    this.recordVariableCorrectionsForEmployeesForm = this.formBuilder.group({
      
  id : [this.selectedRecordVariableCorrectionsForEmployees.id],
  correctionNumber : [this.selectedRecordVariableCorrectionsForEmployees.correctionNumber, [ Validators.required ]],
  incomingMonth : [this.selectedRecordVariableCorrectionsForEmployees.incomingMonth, [ Validators.required ]],
  employeeCode : [this.selectedRecordVariableCorrectionsForEmployees.employeeCode, [ Validators.required ]],
  benefitsMonth : [this.selectedRecordVariableCorrectionsForEmployees.benefitsMonth, [ Validators.required ]],
  noteNumber : [this.selectedRecordVariableCorrectionsForEmployees.noteNumber, [ Validators.required ]],
  basicaSalary : [this.selectedRecordVariableCorrectionsForEmployees.basicaSalary, [ Validators.required ]],
  valuableEfforts : [this.selectedRecordVariableCorrectionsForEmployees.valuableEfforts, [ Validators.required ]],
  incentiveValue : [this.selectedRecordVariableCorrectionsForEmployees.incentiveValue, [ Validators.required ]],
  extraValue : [this.selectedRecordVariableCorrectionsForEmployees.extraValue, [ Validators.required ]],
  bonusValue : [this.selectedRecordVariableCorrectionsForEmployees.bonusValue, [ Validators.required ]],
  correctionCode : [this.selectedRecordVariableCorrectionsForEmployees.correctionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordVariableCorrectionsForEmployeesService.update(this.recordVariableCorrectionsForEmployeesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordVariableCorrectionsForEmployeesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordVariableCorrectionsForEmployeesForm.get(name);
  }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
}
