
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayItemsPrice } from 'app/shared/models/assay-items-price';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayItemsPriceService } from '../shared/assay-items-price.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-items-price-edit',
  templateUrl: './assay-items-price-edit.component.html',
  styleUrls: ['./assay-items-price-edit.component.scss'],
  providers: []
})

export class AssayItemsPriceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayItemsPrice: AssayItemsPrice;
  assayItemsPriceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayItemsPriceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayItemsPriceEditComponent>,
    public assayItemsPriceService: AssayItemsPriceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItemsPrice = new AssayItemsPrice();
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
      
  id : [this.selectedAssayItemsPrice.id],
  activityType : [this.selectedAssayItemsPrice.activityType, [ Validators.required ]],
  pricingYear : [this.selectedAssayItemsPrice.pricingYear, [ ]],
  itemCode : [this.selectedAssayItemsPrice.itemCode, [ Validators.required ]],
  itemName : [this.selectedAssayItemsPrice.itemName, [ ]],
  unitPrice : [this.selectedAssayItemsPrice.unitPrice, [ Validators.required ]],
  workType : [this.selectedAssayItemsPrice.workType, [ Validators.required ]],
  unitCode : [this.selectedAssayItemsPrice.unitCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assayItemsPriceService.update(this.assayItemsPriceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayItemsPriceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayItemsPriceForm.get(name);
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}
