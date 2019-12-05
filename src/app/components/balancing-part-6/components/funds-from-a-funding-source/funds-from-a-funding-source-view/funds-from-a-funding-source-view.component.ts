
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FundsFromAFundingSource } from 'app/shared/models/funds-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FundsFromAFundingSourceService } from '../shared/funds-from-a-funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-funds-from-a-funding-source-view',
  templateUrl: './funds-from-a-funding-source-view.component.html',
  styleUrls: ['./funds-from-a-funding-source-view.component.scss'],
  providers: []
})

export class FundsFromAFundingSourceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundsFromAFundingSource: FundsFromAFundingSource;
  fundsFromAFundingSourceForm: FormGroup;

  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundsFromAFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundsFromAFundingSourceViewComponent>,
    public fundsFromAFundingSourceService: FundsFromAFundingSourceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundsFromAFundingSource = this.selectedFundsFromAFundingSourceDialog.data || this.selectedFundsFromAFundingSource;

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.fundsFromAFundingSourceForm = this.formBuilder.group({
      
  budgetYear : [this.selectedFundsFromAFundingSource.budgetYear],
  clipboardSerial : [this.selectedFundsFromAFundingSource.clipboardSerial],
  fundClipboardNumber : [this.selectedFundsFromAFundingSource.fundClipboardNumber],
  fundingDate : [this.selectedFundsFromAFundingSource.fundingDate],
  fundClipboardAmount : [this.selectedFundsFromAFundingSource.fundClipboardAmount],
  fundingSourceNumber : [this.selectedFundsFromAFundingSource.fundingSourceNumber]
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
    return this.fundsFromAFundingSourceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.fundsFromAFundingSourceForm.controls)) {
      this.fundsFromAFundingSourceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

