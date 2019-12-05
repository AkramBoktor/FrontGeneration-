
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FundingSource } from 'app/shared/models/funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FundingSourceService } from '../shared/funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-funding-source-view',
  templateUrl: './funding-source-view.component.html',
  styleUrls: ['./funding-source-view.component.scss'],
  providers: []
})

export class FundingSourceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundingSource: FundingSource;
  fundingSourceForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundingSourceViewComponent>,
    public fundingSourceService: FundingSourceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundingSource = this.selectedFundingSourceDialog.data || this.selectedFundingSource;

    

    this.fundingSourceForm = this.formBuilder.group({
      
  sourceCategory : [this.selectedFundingSource.sourceCategory],
  sourceCode : [this.selectedFundingSource.sourceCode],
  sourceName : [this.selectedFundingSource.sourceName],
  fundingStart : [this.selectedFundingSource.fundingStart],
  fundingEnd : [this.selectedFundingSource.fundingEnd],
  suggesteValue : [this.selectedFundingSource.suggesteValue],
  dateValue : [this.selectedFundingSource.dateValue],
  currentYearValue : [this.selectedFundingSource.currentYearValue]
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
    return this.fundingSourceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.fundingSourceForm.controls)) {
      this.fundingSourceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

