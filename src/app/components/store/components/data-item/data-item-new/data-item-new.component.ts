
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataItem } from 'app/shared/models/data-item';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DataItemService } from '../shared/data-item.service';


@Component({
  selector: 'app-data-item-new',
  templateUrl: './data-item-new.component.html',
  styleUrls: ['./data-item-new.component.scss'],
  providers: [
    ]
})

export class DataItemNewComponent extends AppBaseComponent implements OnInit {
  dataItemForm: FormGroup;
  @Input() selectedDataItem: DataItem;
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
    @Optional() public dialogRef: MatDialogRef<DataItemNewComponent>,
    public dataItemService: DataItemService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataItem = new DataItem();

    
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
     
  id : [0],
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
    this.dataItemService.create(this.dataItemForm.value)
        .pipe(switchMap(x => {
			return this.dataItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
