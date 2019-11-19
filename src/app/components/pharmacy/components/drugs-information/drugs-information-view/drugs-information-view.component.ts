
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DrugsInformation } from 'app/shared/models/drugs-information';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DrugsInformationService } from '../shared/drugs-information.service';

@Component({
  selector: 'app-drugs-information-view',
  templateUrl: './drugs-information-view.component.html',
  styleUrls: ['./drugs-information-view.component.scss'],
  providers: []
})

export class DrugsInformationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDrugsInformation: DrugsInformation;
  drugsInformationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDrugsInformationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DrugsInformationViewComponent>,
    public drugsInformationService: DrugsInformationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrugsInformation = this.selectedDrugsInformationDialog.data || this.selectedDrugsInformation;

    

    this.drugsInformationForm = this.formBuilder.group({
      
  drugName : [this.selectedDrugsInformation.drugName],
  drugCode : [this.selectedDrugsInformation.drugCode],
  quantity : [this.selectedDrugsInformation.quantity],
  supplier : [this.selectedDrugsInformation.supplier],
  storagePlace : [this.selectedDrugsInformation.storagePlace]
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
    return this.drugsInformationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.drugsInformationForm.controls)) {
      this.drugsInformationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

