
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataEntryForm129Corrections } from 'app/shared/models/data-entry-form-129-corrections';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129CorrectionsService } from '../shared/data-entry-form-129-corrections.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-corrections-view',
  templateUrl: './data-entry-form-129-corrections-view.component.html',
  styleUrls: ['./data-entry-form-129-corrections-view.component.scss'],
  providers: []
})

export class DataEntryForm129CorrectionsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129Corrections: DataEntryForm129Corrections;
  dataEntryForm129CorrectionsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129CorrectionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129CorrectionsViewComponent>,
    public dataEntryForm129CorrectionsService: DataEntryForm129CorrectionsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129Corrections = this.selectedDataEntryForm129CorrectionsDialog.data || this.selectedDataEntryForm129Corrections;

    

    this.dataEntryForm129CorrectionsForm = this.formBuilder.group({
      
  correctionNumber : [this.selectedDataEntryForm129Corrections.correctionNumber],
  month : [this.selectedDataEntryForm129Corrections.month],
  incomingNumber : [this.selectedDataEntryForm129Corrections.incomingNumber]
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
    return this.dataEntryForm129CorrectionsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataEntryForm129CorrectionsForm.controls)) {
      this.dataEntryForm129CorrectionsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

