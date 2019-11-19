
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SalesForms } from 'app/shared/models/sales-forms';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SalesFormsService } from '../shared/sales-forms.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sales-forms-view',
  templateUrl: './sales-forms-view.component.html',
  styleUrls: ['./sales-forms-view.component.scss'],
  providers: []
})

export class SalesFormsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSalesForms: SalesForms;
  salesFormsForm: FormGroup;

  private modelTypesService: LookupService;

  
typeOfFormSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSalesFormsDialog: any,
    @Optional() public dialogRef: MatDialogRef<SalesFormsViewComponent>,
    public salesFormsService: SalesFormsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSalesForms = this.selectedSalesFormsDialog.data || this.selectedSalesForms;

    
	this.typeOfFormSelectOptions = new MaterialSelectOptions({
	 data: this.modelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاستمارة',
	});


    this.salesFormsForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedSalesForms.schoolNumber],
  formNumber : [this.selectedSalesForms.formNumber],
  nameOfTheOwner : [this.selectedSalesForms.nameOfTheOwner],
  famousForNumber : [this.selectedSalesForms.famousForNumber],
  date : [this.selectedSalesForms.date],
  space : [this.selectedSalesForms.space],
  theValue : [this.selectedSalesForms.theValue],
  typeOfForm : [this.selectedSalesForms.typeOfForm]
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
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.salesFormsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.salesFormsForm.controls)) {
      this.salesFormsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.modelTypesService = new LookupService('modeltypes', this.http);
  }
}

