
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalCodesOfGeneralConditionsForAssays } from 'app/shared/models/typical-codes-of-general-conditions-for-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalCodesOfGeneralConditionsForAssaysService } from '../shared/typical-codes-of-general-conditions-for-assays.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-codes-of-general-conditions-for-assays-view',
  templateUrl: './typical-codes-of-general-conditions-for-assays-view.component.html',
  styleUrls: ['./typical-codes-of-general-conditions-for-assays-view.component.scss'],
  providers: []
})

export class TypicalCodesOfGeneralConditionsForAssaysViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalCodesOfGeneralConditionsForAssays: TypicalCodesOfGeneralConditionsForAssays;
  typicalCodesOfGeneralConditionsForAssaysForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalCodesOfGeneralConditionsForAssaysDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalCodesOfGeneralConditionsForAssaysViewComponent>,
    public typicalCodesOfGeneralConditionsForAssaysService: TypicalCodesOfGeneralConditionsForAssaysService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalCodesOfGeneralConditionsForAssays = this.selectedTypicalCodesOfGeneralConditionsForAssaysDialog.data || this.selectedTypicalCodesOfGeneralConditionsForAssays;

    

    this.typicalCodesOfGeneralConditionsForAssaysForm = this.formBuilder.group({
      
  conditionCode : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionCode],
  conditionName : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionName]
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
    return this.typicalCodesOfGeneralConditionsForAssaysForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalCodesOfGeneralConditionsForAssaysForm.controls)) {
      this.typicalCodesOfGeneralConditionsForAssaysForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

