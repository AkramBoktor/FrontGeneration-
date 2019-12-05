
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordingEmployeeDebtValues } from 'app/shared/models/recording-employee-debt-values';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingEmployeeDebtValuesService } from '../shared/recording-employee-debt-values.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-employee-debt-values-view',
  templateUrl: './recording-employee-debt-values-view.component.html',
  styleUrls: ['./recording-employee-debt-values-view.component.scss'],
  providers: []
})

export class RecordingEmployeeDebtValuesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingEmployeeDebtValues: RecordingEmployeeDebtValues;
  recordingEmployeeDebtValuesForm: FormGroup;

  private discountTypesService: LookupService;

  
discountTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingEmployeeDebtValuesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingEmployeeDebtValuesViewComponent>,
    public recordingEmployeeDebtValuesService: RecordingEmployeeDebtValuesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingEmployeeDebtValues = this.selectedRecordingEmployeeDebtValuesDialog.data || this.selectedRecordingEmployeeDebtValues;

    
	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});


    this.recordingEmployeeDebtValuesForm = this.formBuilder.group({
      
  correctionNumber : [this.selectedRecordingEmployeeDebtValues.correctionNumber],
  employeeCode : [this.selectedRecordingEmployeeDebtValues.employeeCode],
  discountValue : [this.selectedRecordingEmployeeDebtValues.discountValue],
  discountType : [this.selectedRecordingEmployeeDebtValues.discountType]
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
    return this.recordingEmployeeDebtValuesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordingEmployeeDebtValuesForm.controls)) {
      this.recordingEmployeeDebtValuesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.discountTypesService = new LookupService('discounttypes', this.http);
  }
}

