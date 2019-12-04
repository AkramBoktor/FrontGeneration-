
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayItemsPrice } from 'app/shared/models/assay-items-price';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItemsPriceService } from '../shared/assay-items-price.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-items-price-view',
  templateUrl: './assay-items-price-view.component.html',
  styleUrls: ['./assay-items-price-view.component.scss'],
  providers: []
})

export class AssayItemsPriceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayItemsPrice: AssayItemsPrice;
  assayItemsPriceForm: FormGroup;

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayItemsPriceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayItemsPriceViewComponent>,
    public assayItemsPriceService: AssayItemsPriceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItemsPrice = this.selectedAssayItemsPriceDialog.data || this.selectedAssayItemsPrice;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.unitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.assayItemsPriceForm = this.formBuilder.group({
      
  activityType : [this.selectedAssayItemsPrice.activityType],
  pricingYear : [this.selectedAssayItemsPrice.pricingYear],
  itemCode : [this.selectedAssayItemsPrice.itemCode],
  itemName : [this.selectedAssayItemsPrice.itemName],
  unitPrice : [this.selectedAssayItemsPrice.unitPrice],
  workType : [this.selectedAssayItemsPrice.workType],
  unitCode : [this.selectedAssayItemsPrice.unitCode]
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
    return this.assayItemsPriceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayItemsPriceForm.controls)) {
      this.assayItemsPriceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}

