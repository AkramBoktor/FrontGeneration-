
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SmoothData } from 'app/shared/models/smooth-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SmoothDataService } from '../shared/smooth-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-smooth-data-view',
  templateUrl: './smooth-data-view.component.html',
  styleUrls: ['./smooth-data-view.component.scss'],
  providers: []
})

export class SmoothDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSmoothData: SmoothData;
  smoothDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSmoothDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SmoothDataViewComponent>,
    public smoothDataService: SmoothDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSmoothData = this.selectedSmoothDataDialog.data || this.selectedSmoothData;

    

    this.smoothDataForm = this.formBuilder.group({
      
  seriesCode : [this.selectedSmoothData.seriesCode],
  seriesTitle : [this.selectedSmoothData.seriesTitle],
  bookNumber : [this.selectedSmoothData.bookNumber],
  bookTitle : [this.selectedSmoothData.bookTitle]
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
    return this.smoothDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.smoothDataForm.controls)) {
      this.smoothDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

