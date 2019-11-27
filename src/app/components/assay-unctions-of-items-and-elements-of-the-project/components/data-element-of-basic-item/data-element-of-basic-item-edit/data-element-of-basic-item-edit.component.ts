
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataElementOfBasicItem } from 'app/shared/models/data-element-of-basic-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataElementOfBasicItemService } from '../shared/data-element-of-basic-item.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-element-of-basic-item-edit',
  templateUrl: './data-element-of-basic-item-edit.component.html',
  styleUrls: ['./data-element-of-basic-item-edit.component.scss'],
  providers: []
})

export class DataElementOfBasicItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataElementOfBasicItem: DataElementOfBasicItem;
  dataElementOfBasicItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private groupCodesService: LookupService;
private pricingTypesService: LookupService;
private measurementUnitsService: LookupService;

  
groupCodeSelectOptions: MaterialSelectOptions;
pricingTypeSelectOptions: MaterialSelectOptions;
measuringUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('groupCode', { static: true }) GroupCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('pricingType', { static: true }) PricingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('measuringUnit', { static: true }) MeasuringUnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataElementOfBasicItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataElementOfBasicItemEditComponent>,
    public dataElementOfBasicItemService: DataElementOfBasicItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataElementOfBasicItem = new DataElementOfBasicItem();
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
      
  id : [this.selectedDataElementOfBasicItem.id],
  itemStatment : [this.selectedDataElementOfBasicItem.itemStatment, [ Validators.required ]],
  pricingYear : [this.selectedDataElementOfBasicItem.pricingYear, [ Validators.required ]],
  firstPrice : [this.selectedDataElementOfBasicItem.firstPrice, [ Validators.required ]],
  groupCode : [this.selectedDataElementOfBasicItem.groupCode, [ Validators.required ]],
  pricingType : [this.selectedDataElementOfBasicItem.pricingType, [ Validators.required ]],
  measuringUnit : [this.selectedDataElementOfBasicItem.measuringUnit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataElementOfBasicItemService.update(this.dataElementOfBasicItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataElementOfBasicItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataElementOfBasicItemForm.get(name);
  }

  initializeLookupServices() {
    this.groupCodesService = new LookupService('groupcodes', this.http);
this.pricingTypesService = new LookupService('pricingtypes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}
