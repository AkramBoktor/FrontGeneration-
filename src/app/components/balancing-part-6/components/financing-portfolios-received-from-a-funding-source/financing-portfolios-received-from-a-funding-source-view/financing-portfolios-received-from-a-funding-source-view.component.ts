
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FinancingPortfoliosReceivedFromAFundingSource } from 'app/shared/models/financing-portfolios-received-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FinancingPortfoliosReceivedFromAFundingSourceService } from '../shared/financing-portfolios-received-from-a-funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-financing-portfolios-received-from-a-funding-source-view',
  templateUrl: './financing-portfolios-received-from-a-funding-source-view.component.html',
  styleUrls: ['./financing-portfolios-received-from-a-funding-source-view.component.scss'],
  providers: []
})

export class FinancingPortfoliosReceivedFromAFundingSourceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinancingPortfoliosReceivedFromAFundingSource: FinancingPortfoliosReceivedFromAFundingSource;
  financingPortfoliosReceivedFromAFundingSourceForm: FormGroup;

  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinancingPortfoliosReceivedFromAFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinancingPortfoliosReceivedFromAFundingSourceViewComponent>,
    public financingPortfoliosReceivedFromAFundingSourceService: FinancingPortfoliosReceivedFromAFundingSourceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancingPortfoliosReceivedFromAFundingSource = this.selectedFinancingPortfoliosReceivedFromAFundingSourceDialog.data || this.selectedFinancingPortfoliosReceivedFromAFundingSource;

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل رقم',
	});


    this.financingPortfoliosReceivedFromAFundingSourceForm = this.formBuilder.group({
      
  budgetYear : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.budgetYear],
  fundingSourceName : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.fundingSourceName],
  clipboardSerial : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardSerial],
  clipboardNumber : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardNumber],
  financingClipboardDate : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.financingClipboardDate],
  clipboardAmount : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardAmount],
  fundingSourceNumber : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.fundingSourceNumber]
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
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.financingPortfoliosReceivedFromAFundingSourceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.financingPortfoliosReceivedFromAFundingSourceForm.controls)) {
      this.financingPortfoliosReceivedFromAFundingSourceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

