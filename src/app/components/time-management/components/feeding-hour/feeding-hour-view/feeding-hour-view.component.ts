
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FeedingHour } from 'app/shared/models/feeding-hour';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FeedingHourService } from '../shared/feeding-hour.service';

@Component({
  selector: 'app-feeding-hour-view',
  templateUrl: './feeding-hour-view.component.html',
  styleUrls: ['./feeding-hour-view.component.scss'],
  providers: []
})

export class FeedingHourViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFeedingHour: FeedingHour;
  feedingHourForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFeedingHourDialog: any,
    @Optional() public dialogRef: MatDialogRef<FeedingHourViewComponent>,
    public feedingHourService: FeedingHourService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFeedingHour = this.selectedFeedingHourDialog.data || this.selectedFeedingHour;

    

    this.feedingHourForm = this.formBuilder.group({
      
  employeeCode : [this.selectedFeedingHour.employeeCode]
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
    return this.feedingHourForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.feedingHourForm.controls)) {
      this.feedingHourForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

