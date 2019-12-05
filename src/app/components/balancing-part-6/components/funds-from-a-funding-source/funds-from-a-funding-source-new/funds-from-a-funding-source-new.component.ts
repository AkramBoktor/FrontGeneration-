
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FundsFromAFundingSource } from 'app/shared/models/funds-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundsFromAFundingSourceService } from '../shared/funds-from-a-funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-funds-from-a-funding-source-new',
  templateUrl: './funds-from-a-funding-source-new.component.html',
  styleUrls: ['./funds-from-a-funding-source-new.component.scss'],
  providers: [
    ]
})

export class FundsFromAFundingSourceNewComponent extends AppBaseComponent implements OnInit {
  fundsFromAFundingSourceForm: FormGroup;
  @Input() selectedFundsFromAFundingSource: FundsFromAFundingSource;
  errorMessages: FormControlError[] = [
        
  ];

  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FundsFromAFundingSourceNewComponent>,
    public fundsFromAFundingSourceService: FundsFromAFundingSourceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundsFromAFundingSource = new FundsFromAFundingSource();

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.fundsFromAFundingSourceForm = this.formBuilder.group({
     
  id : [0],
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
    this.fundsFromAFundingSourceService.create(this.fundsFromAFundingSourceForm.value)
        .pipe(switchMap(x => {
			return this.fundsFromAFundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.fundsFromAFundingSourceForm.get(name);
    }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
 }
