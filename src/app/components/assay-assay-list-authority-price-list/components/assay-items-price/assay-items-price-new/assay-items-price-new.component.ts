
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayItemsPrice } from 'app/shared/models/assay-items-price';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemsPriceService } from '../shared/assay-items-price.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-items-price-new',
  templateUrl: './assay-items-price-new.component.html',
  styleUrls: ['./assay-items-price-new.component.scss'],
  providers: [
    ]
})

export class AssayItemsPriceNewComponent extends AppBaseComponent implements OnInit {
  assayItemsPriceForm: FormGroup;
  @Input() selectedAssayItemsPrice: AssayItemsPrice;
  errorMessages: FormControlError[] = [
        
  ];

  private workTypesService: LookupService;
private modulesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayItemsPriceNewComponent>,
    public assayItemsPriceService: AssayItemsPriceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItemsPrice = new AssayItemsPrice();

    
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
     
  id : [0],
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
    this.assayItemsPriceService.create(this.assayItemsPriceForm.value)
        .pipe(switchMap(x => {
			return this.assayItemsPriceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayItemsPriceForm.get(name);
    }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
 }
