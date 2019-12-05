
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordingCorrectionsForEmployees } from 'app/shared/models/recording-corrections-for-employees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingCorrectionsForEmployeesService } from '../shared/recording-corrections-for-employees.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-corrections-for-employees-new',
  templateUrl: './recording-corrections-for-employees-new.component.html',
  styleUrls: ['./recording-corrections-for-employees-new.component.scss'],
  providers: [
    ]
})

export class RecordingCorrectionsForEmployeesNewComponent extends AppBaseComponent implements OnInit {
  recordingCorrectionsForEmployeesForm: FormGroup;
  @Input() selectedRecordingCorrectionsForEmployees: RecordingCorrectionsForEmployees;
  errorMessages: FormControlError[] = [
        
  ];

  private employeeStatusesService: LookupService;
private noteCodesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
noteCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('noteCode', { static: true }) NoteCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordingCorrectionsForEmployeesNewComponent>,
    public recordingCorrectionsForEmployeesService: RecordingCorrectionsForEmployeesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionsForEmployees = new RecordingCorrectionsForEmployees();

    
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
     
  id : [0],
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
    this.recordingCorrectionsForEmployeesService.create(this.recordingCorrectionsForEmployeesForm.value)
        .pipe(switchMap(x => {
			return this.recordingCorrectionsForEmployeesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordingCorrectionsForEmployeesForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.noteCodesService = new LookupService('notecodes', this.http);
  }
 }
