
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PrimaryAndFinalDeliveryDate } from 'app/shared/models/primary-and-final-delivery-date';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrimaryAndFinalDeliveryDateService } from '../shared/primary-and-final-delivery-date.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-primary-and-final-delivery-date-new',
  templateUrl: './primary-and-final-delivery-date-new.component.html',
  styleUrls: ['./primary-and-final-delivery-date-new.component.scss'],
  providers: [
    ]
})

export class PrimaryAndFinalDeliveryDateNewComponent extends AppBaseComponent implements OnInit {
  primaryAndFinalDeliveryDateForm: FormGroup;
  @Input() selectedPrimaryAndFinalDeliveryDate: PrimaryAndFinalDeliveryDate;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'Greater',
	 errorMessage: 'تاريخ التسليم النهائي يجب ان يكون اكبر من تاريخ التسليم الابتدائي'
	}
  ];

  private constructionTypesService: LookupService;
private deliveryTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
deliveryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deliveryType', { static: true }) DeliveryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PrimaryAndFinalDeliveryDateNewComponent>,
    public primaryAndFinalDeliveryDateService: PrimaryAndFinalDeliveryDateService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrimaryAndFinalDeliveryDate = new PrimaryAndFinalDeliveryDate();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.deliveryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deliveryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التسليم',
	});


    this.primaryAndFinalDeliveryDateForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedPrimaryAndFinalDeliveryDate.projectCode, [ Validators.required ]],
  primaryDeliveryDate : [this.selectedPrimaryAndFinalDeliveryDate.primaryDeliveryDate, [ Validators.required ]],
  finalDeliveryDate : [this.selectedPrimaryAndFinalDeliveryDate.finalDeliveryDate, [ ]],
  constructionType : [this.selectedPrimaryAndFinalDeliveryDate.constructionType, [ Validators.required ]],
  deliveryType : [this.selectedPrimaryAndFinalDeliveryDate.deliveryType, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateGreater("FinalDeliveryDate","PrimaryDeliveryDate") ]
      });

        

  }
  onSubmit() {
    this.primaryAndFinalDeliveryDateService.create(this.primaryAndFinalDeliveryDateForm.value)
        .pipe(switchMap(x => {
			return this.primaryAndFinalDeliveryDateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.primaryAndFinalDeliveryDateForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.deliveryTypesService = new LookupService('deliverytypes', this.http);
  }
 }
