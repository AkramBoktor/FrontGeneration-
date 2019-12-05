
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataEntryForm129BonusesAtTheManagementLevel } from 'app/shared/models/data-entry-form-129-bonuses-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataEntryForm129BonusesAtTheManagementLevelService } from '../shared/data-entry-form-129-bonuses-at-the-management-level.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-bonuses-at-the-management-level-edit',
  templateUrl: './data-entry-form-129-bonuses-at-the-management-level-edit.component.html',
  styleUrls: ['./data-entry-form-129-bonuses-at-the-management-level-edit.component.scss'],
  providers: []
})

export class DataEntryForm129BonusesAtTheManagementLevelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129BonusesAtTheManagementLevel: DataEntryForm129BonusesAtTheManagementLevel;
  dataEntryForm129BonusesAtTheManagementLevelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129BonusesAtTheManagementLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129BonusesAtTheManagementLevelEditComponent>,
    public dataEntryForm129BonusesAtTheManagementLevelService: DataEntryForm129BonusesAtTheManagementLevelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129BonusesAtTheManagementLevel = new DataEntryForm129BonusesAtTheManagementLevel();
    this.selectedDataEntryForm129BonusesAtTheManagementLevel = this.selectedDataEntryForm129BonusesAtTheManagementLevelDialog.data || this.selectedDataEntryForm129BonusesAtTheManagementLevel;

    

    this.dataEntryForm129BonusesAtTheManagementLevelForm = this.formBuilder.group({
      
  id : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.id],
  incomingNumber : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.incomingNumber, [ Validators.required ]],
  month : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.month, [ Validators.required ]],
  bonusCode : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.bonusCode, [ Validators.required ]],
  monthAndYearBonus : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.monthAndYearBonus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataEntryForm129BonusesAtTheManagementLevelService.update(this.dataEntryForm129BonusesAtTheManagementLevelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataEntryForm129BonusesAtTheManagementLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataEntryForm129BonusesAtTheManagementLevelForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
