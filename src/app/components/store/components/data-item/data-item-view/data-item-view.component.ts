
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataItem } from 'app/shared/models/data-item';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataItemService } from '../shared/data-item.service';

@Component({
  selector: 'app-data-item-view',
  templateUrl: './data-item-view.component.html',
  styleUrls: ['./data-item-view.component.scss'],
  providers: []
})

export class DataItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataItem: DataItem;
  dataItemForm: FormGroup;

  private numberTypesService: LookupService;
private itemTypesService: LookupService;
private itemStatusesService: LookupService;
private measurementUnitsService: LookupService;

  
numberTypeSelectOptions: MaterialSelectOptions;
productTypeSelectOptions: MaterialSelectOptions;
itemConditionSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataItemViewComponent>,
    public dataItemService: DataItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataItem = this.selectedDataItemDialog.data || this.selectedDataItem;

    
	this.numberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.numberTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع الرقم (هيئة – معمول ب   ',
	});

	this.productTypeSelectOptions = new MaterialSelectOptions({
	 data: this.itemTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصنف ',
	});

	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة ',
	});


    this.dataItemForm = this.formBuilder.group({
      
  itemNumber : [this.selectedDataItem.itemNumber],
  productName : [this.selectedDataItem.productName],
  unitpPrice : [this.selectedDataItem.unitpPrice],
  selectOrder : [this.selectedDataItem.selectOrder],
  minimum : [this.selectedDataItem.minimum],
  assumedLifetime : [this.selectedDataItem.assumedLifetime],
  numberType : [this.selectedDataItem.numberType],
  productType : [this.selectedDataItem.productType],
  itemCondition : [this.selectedDataItem.itemCondition],
  unit : [this.selectedDataItem.unit]
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
    return this.dataItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataItemForm.controls)) {
      this.dataItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.numberTypesService = new LookupService('numbertypes', this.http);
this.itemTypesService = new LookupService('itemtypes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

