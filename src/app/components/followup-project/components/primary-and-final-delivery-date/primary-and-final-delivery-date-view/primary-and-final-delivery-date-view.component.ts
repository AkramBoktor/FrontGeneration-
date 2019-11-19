
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PrimaryAndFinalDeliveryDate } from 'app/shared/models/primary-and-final-delivery-date';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PrimaryAndFinalDeliveryDateService } from '../shared/primary-and-final-delivery-date.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-primary-and-final-delivery-date-view',
  templateUrl: './primary-and-final-delivery-date-view.component.html',
  styleUrls: ['./primary-and-final-delivery-date-view.component.scss'],
  providers: []
})

export class PrimaryAndFinalDeliveryDateViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrimaryAndFinalDeliveryDate: PrimaryAndFinalDeliveryDate;
  primaryAndFinalDeliveryDateForm: FormGroup;

  private constructionTypesService: LookupService;
private deliveryTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
deliveryTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrimaryAndFinalDeliveryDateDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrimaryAndFinalDeliveryDateViewComponent>,
    public primaryAndFinalDeliveryDateService: PrimaryAndFinalDeliveryDateService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrimaryAndFinalDeliveryDate = this.selectedPrimaryAndFinalDeliveryDateDialog.data || this.selectedPrimaryAndFinalDeliveryDate;

    
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
      
  projectCode : [this.selectedPrimaryAndFinalDeliveryDate.projectCode],
  primaryDeliveryDate : [this.selectedPrimaryAndFinalDeliveryDate.primaryDeliveryDate],
  finalDeliveryDate : [this.selectedPrimaryAndFinalDeliveryDate.finalDeliveryDate],
  constructionType : [this.selectedPrimaryAndFinalDeliveryDate.constructionType],
  deliveryType : [this.selectedPrimaryAndFinalDeliveryDate.deliveryType]
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
	 errorName: 'Greater',
	 errorMessage: 'تاريخ التسليم النهائي يجب ان يكون اكبر من تاريخ التسليم الابتدائي'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.primaryAndFinalDeliveryDateForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.primaryAndFinalDeliveryDateForm.controls)) {
      this.primaryAndFinalDeliveryDateForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.deliveryTypesService = new LookupService('deliverytypes', this.http);
  }
}

