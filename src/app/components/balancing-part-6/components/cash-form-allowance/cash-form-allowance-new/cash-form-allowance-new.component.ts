
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CashFormAllowance } from 'app/shared/models/cash-form-allowance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CashFormAllowanceService } from '../shared/cash-form-allowance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cash-form-allowance-new',
  templateUrl: './cash-form-allowance-new.component.html',
  styleUrls: ['./cash-form-allowance-new.component.scss'],
  providers: [
    ]
})

export class CashFormAllowanceNewComponent extends AppBaseComponent implements OnInit {
  cashFormAllowanceForm: FormGroup;
  @Input() selectedCashFormAllowance: CashFormAllowance;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private jobTypesService: LookupService;

  
requestingAreaSelectOptions: MaterialSelectOptions;
jobNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingArea', { static: true }) RequestingAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('jobNumber', { static: true }) JobNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CashFormAllowanceNewComponent>,
    public cashFormAllowanceService: CashFormAllowanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCashFormAllowance = new CashFormAllowance();

    
	this.requestingAreaSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة الطالبة',
	});

	this.jobNumberSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الوظيفة',
	});


    this.cashFormAllowanceForm = this.formBuilder.group({
     
  id : [0],
  formRegistrationDate : [this.selectedCashFormAllowance.formRegistrationDate, [ Validators.required ]],
  formSerial : [this.selectedCashFormAllowance.formSerial, [ Validators.required ]],
  buildingCode : [this.selectedCashFormAllowance.buildingCode, [ Validators.required ]],
  formStatus : [this.selectedCashFormAllowance.formStatus, [ Validators.required ]],
  formName : [this.selectedCashFormAllowance.formName, [ Validators.required ]],
  sectionNumber : [this.selectedCashFormAllowance.sectionNumber, [ Validators.required ]],
  sectionName : [this.selectedCashFormAllowance.sectionName, [ Validators.required ]],
  workTypeNumber : [this.selectedCashFormAllowance.workTypeNumber, [ Validators.required ]],
  businessTypeName : [this.selectedCashFormAllowance.businessTypeName, [ Validators.required ]],
  formDate : [this.selectedCashFormAllowance.formDate, [ Validators.required ]],
  numberIssuedRequestingArea : [this.selectedCashFormAllowance.numberIssuedRequestingArea, [ Validators.required ]],
  budgetDate : [this.selectedCashFormAllowance.budgetDate, [ Validators.required ]],
  netAbstract : [this.selectedCashFormAllowance.netAbstract, [ Validators.required ]],
  requestingArea : [this.selectedCashFormAllowance.requestingArea, [ Validators.required ]],
  jobNumber : [this.selectedCashFormAllowance.jobNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.cashFormAllowanceService.create(this.cashFormAllowanceForm.value)
        .pipe(switchMap(x => {
			return this.cashFormAllowanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.cashFormAllowanceForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
