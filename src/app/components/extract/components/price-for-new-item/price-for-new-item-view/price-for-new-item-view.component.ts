
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PriceForNewItem } from 'app/shared/models/price-for-new-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PriceForNewItemService } from '../shared/price-for-new-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-price-for-new-item-view',
  templateUrl: './price-for-new-item-view.component.html',
  styleUrls: ['./price-for-new-item-view.component.scss'],
  providers: []
})

export class PriceForNewItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPriceForNewItem: PriceForNewItem;
  priceForNewItemForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPriceForNewItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<PriceForNewItemViewComponent>,
    public priceForNewItemService: PriceForNewItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedPriceForNewItem.buildingCode],
  requestSerial : [this.selectedPriceForNewItem.requestSerial],
  planYear : [this.selectedPriceForNewItem.planYear],
  bidNumber : [this.selectedPriceForNewItem.bidNumber],
  activityType : [this.selectedPriceForNewItem.activityType],
  subActivity : [this.selectedPriceForNewItem.subActivity],
  itemName : [this.selectedPriceForNewItem.itemName],
  price : [this.selectedPriceForNewItem.price],
  constructionType : [this.selectedPriceForNewItem.constructionType],
  offeringType : [this.selectedPriceForNewItem.offeringType],
  workType : [this.selectedPriceForNewItem.workType],
  itemCode : [this.selectedPriceForNewItem.itemCode],
  unit : [this.selectedPriceForNewItem.unit]
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
    return this.priceForNewItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.priceForNewItemForm.controls)) {
      this.priceForNewItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}

