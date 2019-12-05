
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinancingPortfoliosReceivedFromAFundingSource } from 'app/shared/models/financing-portfolios-received-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FinancingPortfoliosReceivedFromAFundingSourceService } from '../shared/financing-portfolios-received-from-a-funding-source.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-financing-portfolios-received-from-a-funding-source-edit',
  templateUrl: './financing-portfolios-received-from-a-funding-source-edit.component.html',
  styleUrls: ['./financing-portfolios-received-from-a-funding-source-edit.component.scss'],
  providers: []
})

export class FinancingPortfoliosReceivedFromAFundingSourceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinancingPortfoliosReceivedFromAFundingSource: FinancingPortfoliosReceivedFromAFundingSource;
  financingPortfoliosReceivedFromAFundingSourceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinancingPortfoliosReceivedFromAFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinancingPortfoliosReceivedFromAFundingSourceEditComponent>,
    public financingPortfoliosReceivedFromAFundingSourceService: FinancingPortfoliosReceivedFromAFundingSourceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancingPortfoliosReceivedFromAFundingSource = new FinancingPortfoliosReceivedFromAFundingSource();
    this.selectedFinancingPortfoliosReceivedFromAFundingSource = this.selectedFinancingPortfoliosReceivedFromAFundingSourceDialog.data || this.selectedFinancingPortfoliosReceivedFromAFundingSource;

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل رقم',
	});


    this.financingPortfoliosReceivedFromAFundingSourceForm = this.formBuilder.group({
      
  id : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.id],
  budgetYear : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.budgetYear, [ Validators.required ]],
  fundingSourceName : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.fundingSourceName, [ Validators.required ]],
  clipboardSerial : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardSerial, [ Validators.required ]],
  clipboardNumber : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardNumber, [ Validators.required ]],
  financingClipboardDate : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.financingClipboardDate, [ Validators.required ]],
  clipboardAmount : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.clipboardAmount, [ Validators.required,Validators.minLength(0) ]],
  fundingSourceNumber : [this.selectedFinancingPortfoliosReceivedFromAFundingSource.fundingSourceNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.financingPortfoliosReceivedFromAFundingSourceService.update(this.financingPortfoliosReceivedFromAFundingSourceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.financingPortfoliosReceivedFromAFundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.financingPortfoliosReceivedFromAFundingSourceForm.get(name);
  }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}
