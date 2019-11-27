
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataElementOfBasicItem } from 'app/shared/models/data-element-of-basic-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataElementOfBasicItemService } from '../shared/data-element-of-basic-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-element-of-basic-item-view',
  templateUrl: './data-element-of-basic-item-view.component.html',
  styleUrls: ['./data-element-of-basic-item-view.component.scss'],
  providers: []
})

export class DataElementOfBasicItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataElementOfBasicItem: DataElementOfBasicItem;
  dataElementOfBasicItemForm: FormGroup;

  private groupCodesService: LookupService;
private pricingTypesService: LookupService;
private measurementUnitsService: LookupService;

  
groupCodeSelectOptions: MaterialSelectOptions;
pricingTypeSelectOptions: MaterialSelectOptions;
measuringUnitSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataElementOfBasicItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataElementOfBasicItemViewComponent>,
    public dataElementOfBasicItemService: DataElementOfBasicItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataElementOfBasicItem = this.selectedDataElementOfBasicItemDialog.data || this.selectedDataElementOfBasicItem;

    
	this.groupCodeSelectOptions = new MaterialSelectOptions({
	 data: this.groupCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المجموعه ',
	});

	this.pricingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pricingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التسعير',
	});

	this.measuringUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحده قياس',
	});


    this.dataElementOfBasicItemForm = this.formBuilder.group({
      
  itemStatment : [this.selectedDataElementOfBasicItem.itemStatment],
  pricingYear : [this.selectedDataElementOfBasicItem.pricingYear],
  firstPrice : [this.selectedDataElementOfBasicItem.firstPrice],
  groupCode : [this.selectedDataElementOfBasicItem.groupCode],
  pricingType : [this.selectedDataElementOfBasicItem.pricingType],
  measuringUnit : [this.selectedDataElementOfBasicItem.measuringUnit]
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
    return this.dataElementOfBasicItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataElementOfBasicItemForm.controls)) {
      this.dataElementOfBasicItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.groupCodesService = new LookupService('groupcodes', this.http);
this.pricingTypesService = new LookupService('pricingtypes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

