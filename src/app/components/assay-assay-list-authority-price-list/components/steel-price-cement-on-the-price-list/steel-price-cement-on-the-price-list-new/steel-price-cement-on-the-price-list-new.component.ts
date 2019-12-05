
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SteelPriceCementOnThePriceList } from 'app/shared/models/steel-price-cement-on-the-price-list';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SteelPriceCementOnThePriceListService } from '../shared/steel-price-cement-on-the-price-list.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-steel-price-cement-on-the-price-list-new',
  templateUrl: './steel-price-cement-on-the-price-list-new.component.html',
  styleUrls: ['./steel-price-cement-on-the-price-list-new.component.scss'],
  providers: [
    ]
})

export class SteelPriceCementOnThePriceListNewComponent extends AppBaseComponent implements OnInit {
  steelPriceCementOnThePriceListForm: FormGroup;
  @Input() selectedSteelPriceCementOnThePriceList: SteelPriceCementOnThePriceList;
  errorMessages: FormControlError[] = [
        
  ];

  private materialTypesService: LookupService;

  
materialTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('materialType', { static: true }) MaterialTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SteelPriceCementOnThePriceListNewComponent>,
    public steelPriceCementOnThePriceListService: SteelPriceCementOnThePriceListService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSteelPriceCementOnThePriceList = new SteelPriceCementOnThePriceList();

    
	this.materialTypeSelectOptions = new MaterialSelectOptions({
	 data: this.materialTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المادة',
	});


    this.steelPriceCementOnThePriceListForm = this.formBuilder.group({
     
  id : [0],
  pricingYear : [this.selectedSteelPriceCementOnThePriceList.pricingYear, [ Validators.required ]],
  price : [this.selectedSteelPriceCementOnThePriceList.price, [ Validators.required ]],
  materialType : [this.selectedSteelPriceCementOnThePriceList.materialType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.steelPriceCementOnThePriceListService.create(this.steelPriceCementOnThePriceListForm.value)
        .pipe(switchMap(x => {
			return this.steelPriceCementOnThePriceListService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.steelPriceCementOnThePriceListForm.get(name);
    }

  initializeLookupServices() {
    this.materialTypesService = new LookupService('materialtypes', this.http);
  }
 }
