
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataElementOfBasicItem } from 'app/shared/models/data-element-of-basic-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataElementOfBasicItemService } from '../shared/data-element-of-basic-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-element-of-basic-item-new',
  templateUrl: './data-element-of-basic-item-new.component.html',
  styleUrls: ['./data-element-of-basic-item-new.component.scss'],
  providers: [
    ]
})

export class DataElementOfBasicItemNewComponent extends AppBaseComponent implements OnInit {
  dataElementOfBasicItemForm: FormGroup;
  @Input() selectedDataElementOfBasicItem: DataElementOfBasicItem;
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
    @Optional() public dialogRef: MatDialogRef<DataElementOfBasicItemNewComponent>,
    public dataElementOfBasicItemService: DataElementOfBasicItemService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataElementOfBasicItem = new DataElementOfBasicItem();

    
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
     
  id : [0],
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
    this.dataElementOfBasicItemService.create(this.dataElementOfBasicItemForm.value)
        .pipe(switchMap(x => {
			return this.dataElementOfBasicItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
