
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DailyPrintErrorData } from 'app/shared/models/daily-print-error-data';
import { switchMap } from 'rxjs/operators';
import { DailyPrintErrorDataService } from '../shared/daily-print-error-data.service';


@Component({
  selector: 'app-daily-print-error-data-new',
  templateUrl: './daily-print-error-data-new.component.html',
  styleUrls: ['./daily-print-error-data-new.component.scss'],
  providers: [
    ]
})

export class DailyPrintErrorDataNewComponent extends AppBaseComponent implements OnInit {
  dailyPrintErrorDataForm: FormGroup;
  @Input() selectedDailyPrintErrorData: DailyPrintErrorData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DailyPrintErrorDataNewComponent>,
    public dailyPrintErrorDataService: DailyPrintErrorDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDailyPrintErrorData = new DailyPrintErrorData();

    

    this.dailyPrintErrorDataForm = this.formBuilder.group({
     
  id : [0],
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
    this.dailyPrintErrorDataService.create(this.dailyPrintErrorDataForm.value)
        .pipe(switchMap(x => {
			return this.dailyPrintErrorDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dailyPrintErrorDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
