
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExchangeForm } from 'app/shared/models/exchange-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExchangeFormService } from '../shared/exchange-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-exchange-form-new',
  templateUrl: './exchange-form-new.component.html',
  styleUrls: ['./exchange-form-new.component.scss'],
  providers: [
    ]
})

export class ExchangeFormNewComponent extends AppBaseComponent implements OnInit {
  exchangeFormForm: FormGroup;
  @Input() selectedExchangeForm: ExchangeForm;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;

  
zipCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('zipCode', { static: true }) ZipCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExchangeFormNewComponent>,
    public exchangeFormService: ExchangeFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExchangeForm = new ExchangeForm();

    
	this.zipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقة',
	});


    this.exchangeFormForm = this.formBuilder.group({
     
  id : [0],
  formNumber : [this.selectedExchangeForm.formNumber, [ Validators.required ]],
  formDate : [this.selectedExchangeForm.formDate, [ Validators.required ]],
  formAmount : [this.selectedExchangeForm.formAmount, [ Validators.required ]],
  formStatement : [this.selectedExchangeForm.formStatement, [ Validators.required ]],
  schoolNumber : [this.selectedExchangeForm.schoolNumber, [ Validators.required ]],
  schoolName : [this.selectedExchangeForm.schoolName, [ Validators.required ]],
  amount : [this.selectedExchangeForm.amount, [ Validators.required ]],
  total : [this.selectedExchangeForm.total, [ Validators.required ]],
  zipCode : [this.selectedExchangeForm.zipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.exchangeFormService.create(this.exchangeFormForm.value)
        .pipe(switchMap(x => {
			return this.exchangeFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.exchangeFormForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
 }
