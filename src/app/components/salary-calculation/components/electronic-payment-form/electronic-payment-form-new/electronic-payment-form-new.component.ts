
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ElectronicPaymentForm } from 'app/shared/models/electronic-payment-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectronicPaymentFormService } from '../shared/electronic-payment-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electronic-payment-form-new',
  templateUrl: './electronic-payment-form-new.component.html',
  styleUrls: ['./electronic-payment-form-new.component.scss'],
  providers: [
    ]
})

export class ElectronicPaymentFormNewComponent extends AppBaseComponent implements OnInit {
  electronicPaymentFormForm: FormGroup;
  @Input() selectedElectronicPaymentForm: ElectronicPaymentForm;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private paidTypesService: LookupService;

  
areaNumberSelectOptions: MaterialSelectOptions;
paidTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaNumber', { static: true }) AreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('paidType', { static: true }) PaidTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ElectronicPaymentFormNewComponent>,
    public electronicPaymentFormService: ElectronicPaymentFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectronicPaymentForm = new ElectronicPaymentForm();

    
	this.areaNumberSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقه الطالبه',
	});

	this.paidTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paidTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المدفوع',
	});


    this.electronicPaymentFormForm = this.formBuilder.group({
     
  id : [0],
  form55Date : [this.selectedElectronicPaymentForm.form55Date, [ Validators.required ]],
  form55Number : [this.selectedElectronicPaymentForm.form55Number, [ Validators.required ]],
  areaNumber : [this.selectedElectronicPaymentForm.areaNumber, [ Validators.required ]],
  paidType : [this.selectedElectronicPaymentForm.paidType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.electronicPaymentFormService.create(this.electronicPaymentFormForm.value)
        .pipe(switchMap(x => {
			return this.electronicPaymentFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.electronicPaymentFormForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.paidTypesService = new LookupService('paidtypes', this.http);
  }
 }
