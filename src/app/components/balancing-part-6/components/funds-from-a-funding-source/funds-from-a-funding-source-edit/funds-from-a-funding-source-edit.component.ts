
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FundsFromAFundingSource } from 'app/shared/models/funds-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FundsFromAFundingSourceService } from '../shared/funds-from-a-funding-source.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-funds-from-a-funding-source-edit',
  templateUrl: './funds-from-a-funding-source-edit.component.html',
  styleUrls: ['./funds-from-a-funding-source-edit.component.scss'],
  providers: []
})

export class FundsFromAFundingSourceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFundsFromAFundingSource: FundsFromAFundingSource;
  fundsFromAFundingSourceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFundsFromAFundingSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FundsFromAFundingSourceEditComponent>,
    public fundsFromAFundingSourceService: FundsFromAFundingSourceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundsFromAFundingSource = new FundsFromAFundingSource();
    this.selectedFundsFromAFundingSource = this.selectedFundsFromAFundingSourceDialog.data || this.selectedFundsFromAFundingSource;

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.fundsFromAFundingSourceForm = this.formBuilder.group({
      
  id : [this.selectedFundsFromAFundingSource.id],
  budgetYear : [this.selectedFundsFromAFundingSource.budgetYear, [ Validators.required ]],
  clipboardSerial : [this.selectedFundsFromAFundingSource.clipboardSerial, [ Validators.required ]],
  fundClipboardNumber : [this.selectedFundsFromAFundingSource.fundClipboardNumber, [ Validators.required ]],
  fundingDate : [this.selectedFundsFromAFundingSource.fundingDate, [ Validators.required ]],
  fundClipboardAmount : [this.selectedFundsFromAFundingSource.fundClipboardAmount, [ Validators.required ]],
  fundingSourceNumber : [this.selectedFundsFromAFundingSource.fundingSourceNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.fundsFromAFundingSourceService.update(this.fundsFromAFundingSourceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.fundsFromAFundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.fundsFromAFundingSourceForm.get(name);
  }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}
