
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordVariableCorrectionsForEmployees } from 'app/shared/models/record-variable-corrections-for-employees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordVariableCorrectionsForEmployeesService } from '../shared/record-variable-corrections-for-employees.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-variable-corrections-for-employees-new',
  templateUrl: './record-variable-corrections-for-employees-new.component.html',
  styleUrls: ['./record-variable-corrections-for-employees-new.component.scss'],
  providers: [
    ]
})

export class RecordVariableCorrectionsForEmployeesNewComponent extends AppBaseComponent implements OnInit {
  recordVariableCorrectionsForEmployeesForm: FormGroup;
  @Input() selectedRecordVariableCorrectionsForEmployees: RecordVariableCorrectionsForEmployees;
  errorMessages: FormControlError[] = [
        
  ];

  private correctionTypesService: LookupService;

  
correctionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionCode', { static: true }) CorrectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordVariableCorrectionsForEmployeesNewComponent>,
    public recordVariableCorrectionsForEmployeesService: RecordVariableCorrectionsForEmployeesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordVariableCorrectionsForEmployees = new RecordVariableCorrectionsForEmployees();

    
	this.correctionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصويب',
	});


    this.recordVariableCorrectionsForEmployeesForm = this.formBuilder.group({
     
  id : [0],
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
    this.recordVariableCorrectionsForEmployeesService.create(this.recordVariableCorrectionsForEmployeesForm.value)
        .pipe(switchMap(x => {
			return this.recordVariableCorrectionsForEmployeesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordVariableCorrectionsForEmployeesForm.get(name);
    }

  initializeLookupServices() {
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
 }
