
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataOfTheLandSeriesInLegalAffairs } from 'app/shared/models/data-of-the-land-series-in-legal-affairs';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfTheLandSeriesInLegalAffairsService } from '../shared/data-of-the-land-series-in-legal-affairs.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-the-land-series-in-legal-affairs-view',
  templateUrl: './data-of-the-land-series-in-legal-affairs-view.component.html',
  styleUrls: ['./data-of-the-land-series-in-legal-affairs-view.component.scss'],
  providers: []
})

export class DataOfTheLandSeriesInLegalAffairsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfTheLandSeriesInLegalAffairs: DataOfTheLandSeriesInLegalAffairs;
  dataOfTheLandSeriesInLegalAffairsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfTheLandSeriesInLegalAffairsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfTheLandSeriesInLegalAffairsViewComponent>,
    public dataOfTheLandSeriesInLegalAffairsService: DataOfTheLandSeriesInLegalAffairsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfTheLandSeriesInLegalAffairs = this.selectedDataOfTheLandSeriesInLegalAffairsDialog.data || this.selectedDataOfTheLandSeriesInLegalAffairs;

    

    this.dataOfTheLandSeriesInLegalAffairsForm = this.formBuilder.group({
      
  landIDLegalAffairs : [this.selectedDataOfTheLandSeriesInLegalAffairs.landIDLegalAffairs],
  landID : [this.selectedDataOfTheLandSeriesInLegalAffairs.landID]
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
    return this.dataOfTheLandSeriesInLegalAffairsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataOfTheLandSeriesInLegalAffairsForm.controls)) {
      this.dataOfTheLandSeriesInLegalAffairsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

