
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TemporarySeizureData } from 'app/shared/models/temporary-seizure-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TemporarySeizureDataService } from '../shared/temporary-seizure-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-temporary-seizure-data-view',
  templateUrl: './temporary-seizure-data-view.component.html',
  styleUrls: ['./temporary-seizure-data-view.component.scss'],
  providers: []
})

export class TemporarySeizureDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTemporarySeizureData: TemporarySeizureData;
  temporarySeizureDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTemporarySeizureDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TemporarySeizureDataViewComponent>,
    public temporarySeizureDataService: TemporarySeizureDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTemporarySeizureData = this.selectedTemporarySeizureDataDialog.data || this.selectedTemporarySeizureData;

    

    this.temporarySeizureDataForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedTemporarySeizureData.schoolNumber],
  temporarySeizureNumber : [this.selectedTemporarySeizureData.temporarySeizureNumber],
  dateOfTemporarySeizure : [this.selectedTemporarySeizureData.dateOfTemporarySeizure],
  numberOfPublicationsInEgyptianFacts : [this.selectedTemporarySeizureData.numberOfPublicationsInEgyptianFacts],
  dateOfPublicationInTheEgyptianFacts : [this.selectedTemporarySeizureData.dateOfPublicationInTheEgyptianFacts]
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
    return this.temporarySeizureDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.temporarySeizureDataForm.controls)) {
      this.temporarySeizureDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

