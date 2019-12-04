
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PriceForNewItem } from 'app/shared/models/price-for-new-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PriceForNewItemService } from '../shared/price-for-new-item.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-price-for-new-item-edit',
  templateUrl: './price-for-new-item-edit.component.html',
  styleUrls: ['./price-for-new-item-edit.component.scss'],
  providers: []
})

export class PriceForNewItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPriceForNewItem: PriceForNewItem;
  priceForNewItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private modulesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPriceForNewItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<PriceForNewItemEditComponent>,
    public priceForNewItemService: PriceForNewItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPriceForNewItem = new PriceForNewItem();
    this.selectedPriceForNewItem = this.selectedPriceForNewItemDialog.data || this.selectedPriceForNewItem;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.priceForNewItemForm = this.formBuilder.group({
      
  id : [this.selectedPriceForNewItem.id],
  buildingCode : [this.selectedPriceForNewItem.buildingCode, [ Validators.required ]],
  requestSerial : [this.selectedPriceForNewItem.requestSerial, [ ]],
  planYear : [this.selectedPriceForNewItem.planYear, [ ]],
  bidNumber : [this.selectedPriceForNewItem.bidNumber, [ Validators.required ]],
  activityType : [this.selectedPriceForNewItem.activityType, [ Validators.required ]],
  subActivity : [this.selectedPriceForNewItem.subActivity, [ Validators.required ]],
  itemName : [this.selectedPriceForNewItem.itemName, [ ]],
  price : [this.selectedPriceForNewItem.price, [ Validators.required ]],
  constructionType : [this.selectedPriceForNewItem.constructionType, [ Validators.required ]],
  offeringType : [this.selectedPriceForNewItem.offeringType, [ Validators.required ]],
  workType : [this.selectedPriceForNewItem.workType, [ Validators.required ]],
  itemCode : [this.selectedPriceForNewItem.itemCode, [ Validators.required ]],
  unit : [this.selectedPriceForNewItem.unit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.priceForNewItemService.update(this.priceForNewItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.priceForNewItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.priceForNewItemForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}
