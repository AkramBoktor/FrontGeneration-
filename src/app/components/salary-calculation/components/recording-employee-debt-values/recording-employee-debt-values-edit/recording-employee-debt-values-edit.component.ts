
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordingEmployeeDebtValues } from 'app/shared/models/recording-employee-debt-values';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordingEmployeeDebtValuesService } from '../shared/recording-employee-debt-values.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-employee-debt-values-edit',
  templateUrl: './recording-employee-debt-values-edit.component.html',
  styleUrls: ['./recording-employee-debt-values-edit.component.scss'],
  providers: []
})

export class RecordingEmployeeDebtValuesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingEmployeeDebtValues: RecordingEmployeeDebtValues;
  recordingEmployeeDebtValuesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private discountTypesService: LookupService;

  
discountTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('discountType', { static: true }) DiscountTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingEmployeeDebtValuesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingEmployeeDebtValuesEditComponent>,
    public recordingEmployeeDebtValuesService: RecordingEmployeeDebtValuesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingEmployeeDebtValues = new RecordingEmployeeDebtValues();
    this.selectedRecordingEmployeeDebtValues = this.selectedRecordingEmployeeDebtValuesDialog.data || this.selectedRecordingEmployeeDebtValues;

    
	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});


    this.recordingEmployeeDebtValuesForm = this.formBuilder.group({
      
  id : [this.selectedRecordingEmployeeDebtValues.id],
  correctionNumber : [this.selectedRecordingEmployeeDebtValues.correctionNumber, [ Validators.required ]],
  employeeCode : [this.selectedRecordingEmployeeDebtValues.employeeCode, [ Validators.required ]],
  discountValue : [this.selectedRecordingEmployeeDebtValues.discountValue, [ Validators.required ]],
  discountType : [this.selectedRecordingEmployeeDebtValues.discountType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordingEmployeeDebtValuesService.update(this.recordingEmployeeDebtValuesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordingEmployeeDebtValuesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordingEmployeeDebtValuesForm.get(name);
  }

  initializeLookupServices() {
    this.discountTypesService = new LookupService('discounttypes', this.http);
  }
}
