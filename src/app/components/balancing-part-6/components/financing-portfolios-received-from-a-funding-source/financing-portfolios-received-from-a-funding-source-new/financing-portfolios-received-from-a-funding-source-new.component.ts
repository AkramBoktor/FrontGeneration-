
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FinancingPortfoliosReceivedFromAFundingSource } from 'app/shared/models/financing-portfolios-received-from-a-funding-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FinancingPortfoliosReceivedFromAFundingSourceService } from '../shared/financing-portfolios-received-from-a-funding-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-financing-portfolios-received-from-a-funding-source-new',
  templateUrl: './financing-portfolios-received-from-a-funding-source-new.component.html',
  styleUrls: ['./financing-portfolios-received-from-a-funding-source-new.component.scss'],
  providers: [
    ]
})

export class FinancingPortfoliosReceivedFromAFundingSourceNewComponent extends AppBaseComponent implements OnInit {
  financingPortfoliosReceivedFromAFundingSourceForm: FormGroup;
  @Input() selectedFinancingPortfoliosReceivedFromAFundingSource: FinancingPortfoliosReceivedFromAFundingSource;
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
    @Optional() public dialogRef: MatDialogRef<FinancingPortfoliosReceivedFromAFundingSourceNewComponent>,
    public financingPortfoliosReceivedFromAFundingSourceService: FinancingPortfoliosReceivedFromAFundingSourceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancingPortfoliosReceivedFromAFundingSource = new FinancingPortfoliosReceivedFromAFundingSource();

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل رقم',
	});


    this.financingPortfoliosReceivedFromAFundingSourceForm = this.formBuilder.group({
     
  id : [0],
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
    this.financingPortfoliosReceivedFromAFundingSourceService.create(this.financingPortfoliosReceivedFromAFundingSourceForm.value)
        .pipe(switchMap(x => {
			return this.financingPortfoliosReceivedFromAFundingSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.financingPortfoliosReceivedFromAFundingSourceForm.get(name);
    }

  initializeLookupServices() {
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
 }
