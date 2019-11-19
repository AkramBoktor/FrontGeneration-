
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DailyPrintErrorData } from 'app/shared/models/daily-print-error-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DailyPrintErrorDataService } from '../shared/daily-print-error-data.service';

@Component({
  selector: 'app-daily-print-error-data-view',
  templateUrl: './daily-print-error-data-view.component.html',
  styleUrls: ['./daily-print-error-data-view.component.scss'],
  providers: []
})

export class DailyPrintErrorDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDailyPrintErrorData: DailyPrintErrorData;
  dailyPrintErrorDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDailyPrintErrorDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<DailyPrintErrorDataViewComponent>,
    public dailyPrintErrorDataService: DailyPrintErrorDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDailyPrintErrorData = this.selectedDailyPrintErrorDataDialog.data || this.selectedDailyPrintErrorData;

    

    this.dailyPrintErrorDataForm = this.formBuilder.group({
      
  todayDate : [this.selectedDailyPrintErrorData.todayDate],
  employeeCode : [this.selectedDailyPrintErrorData.employeeCode],
  entryTime1 : [this.selectedDailyPrintErrorData.entryTime1],
  entryTime2 : [this.selectedDailyPrintErrorData.entryTime2],
  exitTime1 : [this.selectedDailyPrintErrorData.exitTime1],
  exitTime2 : [this.selectedDailyPrintErrorData.exitTime2]
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
    return this.dailyPrintErrorDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dailyPrintErrorDataForm.controls)) {
      this.dailyPrintErrorDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

