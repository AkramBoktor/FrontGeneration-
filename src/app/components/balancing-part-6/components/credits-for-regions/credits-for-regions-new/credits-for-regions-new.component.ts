
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CreditsForRegions } from 'app/shared/models/credits-for-regions';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CreditsForRegionsService } from '../shared/credits-for-regions.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-credits-for-regions-new',
  templateUrl: './credits-for-regions-new.component.html',
  styleUrls: ['./credits-for-regions-new.component.scss'],
  providers: [
    ]
})

export class CreditsForRegionsNewComponent extends AppBaseComponent implements OnInit {
  creditsForRegionsForm: FormGroup;
  @Input() selectedCreditsForRegions: CreditsForRegions;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private budgetItemsService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetItem', { static: true }) BudgetItemSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CreditsForRegionsNewComponent>,
    public creditsForRegionsService: CreditsForRegionsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCreditsForRegions = new CreditsForRegions();

    
	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.budgetItemSelectOptions = new MaterialSelectOptions({
	 data: this.budgetItemsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بند الموازنة',
	});

	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.creditsForRegionsForm = this.formBuilder.group({
     
  id : [0],
  budgetYear : [this.selectedCreditsForRegions.budgetYear, [ Validators.required ]],
  regionApprovedAmount : [this.selectedCreditsForRegions.regionApprovedAmount, [ Validators.required ]],
  areaCode : [this.selectedCreditsForRegions.areaCode, [ Validators.required ]],
  budgetItem : [this.selectedCreditsForRegions.budgetItem, [ Validators.required ]],
  fundingSourceNumber : [this.selectedCreditsForRegions.fundingSourceNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.creditsForRegionsService.create(this.creditsForRegionsForm.value)
        .pipe(switchMap(x => {
			return this.creditsForRegionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.creditsForRegionsForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
 }
