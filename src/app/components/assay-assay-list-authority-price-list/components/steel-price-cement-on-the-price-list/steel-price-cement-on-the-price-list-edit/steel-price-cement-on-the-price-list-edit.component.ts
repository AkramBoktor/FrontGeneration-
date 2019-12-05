
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SteelPriceCementOnThePriceList } from 'app/shared/models/steel-price-cement-on-the-price-list';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SteelPriceCementOnThePriceListService } from '../shared/steel-price-cement-on-the-price-list.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-steel-price-cement-on-the-price-list-edit',
  templateUrl: './steel-price-cement-on-the-price-list-edit.component.html',
  styleUrls: ['./steel-price-cement-on-the-price-list-edit.component.scss'],
  providers: []
})

export class SteelPriceCementOnThePriceListEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSteelPriceCementOnThePriceList: SteelPriceCementOnThePriceList;
  steelPriceCementOnThePriceListForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private materialTypesService: LookupService;

  
materialTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('materialType', { static: true }) MaterialTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSteelPriceCementOnThePriceListDialog: any,
    @Optional() public dialogRef: MatDialogRef<SteelPriceCementOnThePriceListEditComponent>,
    public steelPriceCementOnThePriceListService: SteelPriceCementOnThePriceListService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSteelPriceCementOnThePriceList = new SteelPriceCementOnThePriceList();
    this.selectedSteelPriceCementOnThePriceList = this.selectedSteelPriceCementOnThePriceListDialog.data || this.selectedSteelPriceCementOnThePriceList;

    
	this.materialTypeSelectOptions = new MaterialSelectOptions({
	 data: this.materialTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المادة',
	});


    this.steelPriceCementOnThePriceListForm = this.formBuilder.group({
      
  id : [this.selectedSteelPriceCementOnThePriceList.id],
  pricingYear : [this.selectedSteelPriceCementOnThePriceList.pricingYear, [ Validators.required ]],
  price : [this.selectedSteelPriceCementOnThePriceList.price, [ Validators.required ]],
  materialType : [this.selectedSteelPriceCementOnThePriceList.materialType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.steelPriceCementOnThePriceListService.update(this.steelPriceCementOnThePriceListForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.steelPriceCementOnThePriceListService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.steelPriceCementOnThePriceListForm.get(name);
  }

  initializeLookupServices() {
    this.materialTypesService = new LookupService('materialtypes', this.http);
  }
}
