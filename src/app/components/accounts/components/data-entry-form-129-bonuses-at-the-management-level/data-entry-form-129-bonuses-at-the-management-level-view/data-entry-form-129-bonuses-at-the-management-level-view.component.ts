
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataEntryForm129BonusesAtTheManagementLevel } from 'app/shared/models/data-entry-form-129-bonuses-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129BonusesAtTheManagementLevelService } from '../shared/data-entry-form-129-bonuses-at-the-management-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-bonuses-at-the-management-level-view',
  templateUrl: './data-entry-form-129-bonuses-at-the-management-level-view.component.html',
  styleUrls: ['./data-entry-form-129-bonuses-at-the-management-level-view.component.scss'],
  providers: []
})

export class DataEntryForm129BonusesAtTheManagementLevelViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129BonusesAtTheManagementLevel: DataEntryForm129BonusesAtTheManagementLevel;
  dataEntryForm129BonusesAtTheManagementLevelForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129BonusesAtTheManagementLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129BonusesAtTheManagementLevelViewComponent>,
    public dataEntryForm129BonusesAtTheManagementLevelService: DataEntryForm129BonusesAtTheManagementLevelService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129BonusesAtTheManagementLevel = this.selectedDataEntryForm129BonusesAtTheManagementLevelDialog.data || this.selectedDataEntryForm129BonusesAtTheManagementLevel;

    

    this.dataEntryForm129BonusesAtTheManagementLevelForm = this.formBuilder.group({
      
  incomingNumber : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.incomingNumber],
  month : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.month],
  bonusCode : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.bonusCode],
  monthAndYearBonus : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.monthAndYearBonus]
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
    return this.dataEntryForm129BonusesAtTheManagementLevelForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataEntryForm129BonusesAtTheManagementLevelForm.controls)) {
      this.dataEntryForm129BonusesAtTheManagementLevelForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

