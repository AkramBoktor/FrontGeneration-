
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataItem } from 'app/shared/models/data-item';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DataItemService } from '../shared/data-item.service';




@Component({
  selector: 'app-data-item-edit',
  templateUrl: './data-item-edit.component.html',
  styleUrls: ['./data-item-edit.component.scss'],
  providers: []
})

export class DataItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataItem: DataItem;
  dataItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private numberTypesService: LookupService;
private itemTypesService: LookupService;
private itemStatusesService: LookupService;
private measurementUnitsService: LookupService;

  
numberTypeSelectOptions: MaterialSelectOptions;
productTypeSelectOptions: MaterialSelectOptions;
itemConditionSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('numberType', { static: true }) NumberTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('productType', { static: true }) ProductTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataItemEditComponent>,
    public dataItemService: DataItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataItem = new DataItem();
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
      
  id : [this.selectedDataItem.id],
  itemNumber : [this.selectedDataItem.itemNumber, [ Validators.required ]],
  productName : [this.selectedDataItem.productName, [ Validators.required ]],
  unitpPrice : [this.selectedDataItem.unitpPrice, [ Validators.required ]],
  selectOrder : [this.selectedDataItem.selectOrder, [ Validators.required ]],
  minimum : [this.selectedDataItem.minimum, [ Validators.required ]],
  assumedLifetime : [this.selectedDataItem.assumedLifetime, [ Validators.required ]],
  numberType : [this.selectedDataItem.numberType, [ Validators.required ]],
  productType : [this.selectedDataItem.productType, [ Validators.required ]],
  itemCondition : [this.selectedDataItem.itemCondition, [ Validators.required ]],
  unit : [this.selectedDataItem.unit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataItemService.update(this.dataItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.dataItemForm.get(name);
  }

  initializeLookupServices() {
    this.numberTypesService = new LookupService('numbertypes', this.http);
this.itemTypesService = new LookupService('itemtypes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}
