
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordingCorrectionsForEmployees } from 'app/shared/models/recording-corrections-for-employees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordingCorrectionsForEmployeesService } from '../shared/recording-corrections-for-employees.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-corrections-for-employees-edit',
  templateUrl: './recording-corrections-for-employees-edit.component.html',
  styleUrls: ['./recording-corrections-for-employees-edit.component.scss'],
  providers: []
})

export class RecordingCorrectionsForEmployeesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingCorrectionsForEmployees: RecordingCorrectionsForEmployees;
  recordingCorrectionsForEmployeesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private employeeStatusesService: LookupService;
private noteCodesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
noteCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('noteCode', { static: true }) NoteCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingCorrectionsForEmployeesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingCorrectionsForEmployeesEditComponent>,
    public recordingCorrectionsForEmployeesService: RecordingCorrectionsForEmployeesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionsForEmployees = new RecordingCorrectionsForEmployees();
    this.selectedRecordingCorrectionsForEmployees = this.selectedRecordingCorrectionsForEmployeesDialog.data || this.selectedRecordingCorrectionsForEmployees;

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.noteCodeSelectOptions = new MaterialSelectOptions({
	 data: this.noteCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كودالملاحظه',
	});


    this.recordingCorrectionsForEmployeesForm = this.formBuilder.group({
      
  id : [this.selectedRecordingCorrectionsForEmployees.id],
  employeeCode : [this.selectedRecordingCorrectionsForEmployees.employeeCode, [ Validators.required ]],
  incomingNumber : [this.selectedRecordingCorrectionsForEmployees.incomingNumber, [ Validators.required ]],
  incomingMonthAndYear : [this.selectedRecordingCorrectionsForEmployees.incomingMonthAndYear, [ Validators.required ]],
  noteMonth : [this.selectedRecordingCorrectionsForEmployees.noteMonth, [ Validators.required ]],
  value : [this.selectedRecordingCorrectionsForEmployees.value, [ Validators.required ]],
  employeeStatus : [this.selectedRecordingCorrectionsForEmployees.employeeStatus, [ Validators.required ]],
  noteCode : [this.selectedRecordingCorrectionsForEmployees.noteCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordingCorrectionsForEmployeesService.update(this.recordingCorrectionsForEmployeesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordingCorrectionsForEmployeesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordingCorrectionsForEmployeesForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.noteCodesService = new LookupService('notecodes', this.http);
  }
}
