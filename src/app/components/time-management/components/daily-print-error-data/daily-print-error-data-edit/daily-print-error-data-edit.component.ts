
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DailyPrintErrorData } from 'app/shared/models/daily-print-error-data';
import { switchMap } from 'rxjs/operators';
import { DailyPrintErrorDataService } from '../shared/daily-print-error-data.service';




@Component({
  selector: 'app-daily-print-error-data-edit',
  templateUrl: './daily-print-error-data-edit.component.html',
  styleUrls: ['./daily-print-error-data-edit.component.scss'],
  providers: []
})

export class DailyPrintErrorDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDailyPrintErrorData: DailyPrintErrorData;
  dailyPrintErrorDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDailyPrintErrorDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<DailyPrintErrorDataEditComponent>,
    public dailyPrintErrorDataService: DailyPrintErrorDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDailyPrintErrorData = new DailyPrintErrorData();
    this.selectedDailyPrintErrorData = this.selectedDailyPrintErrorDataDialog.data || this.selectedDailyPrintErrorData;

    

    this.dailyPrintErrorDataForm = this.formBuilder.group({
      
  id : [this.selectedDailyPrintErrorData.id],
  todayDate : [this.selectedDailyPrintErrorData.todayDate, [ Validators.required ]],
  employeeCode : [this.selectedDailyPrintErrorData.employeeCode, [ Validators.required ]],
  entryTime1 : [this.selectedDailyPrintErrorData.entryTime1, [ Validators.required ]],
  entryTime2 : [this.selectedDailyPrintErrorData.entryTime2, [ Validators.required ]],
  exitTime1 : [this.selectedDailyPrintErrorData.exitTime1, [ Validators.required ]],
  exitTime2 : [this.selectedDailyPrintErrorData.exitTime2, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dailyPrintErrorDataService.update(this.dailyPrintErrorDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dailyPrintErrorDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dailyPrintErrorDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
