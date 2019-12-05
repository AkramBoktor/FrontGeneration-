
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ItemsOfAssayLists } from 'app/shared/models/items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ItemsOfAssayListsService } from '../shared/items-of-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-items-of-assay-lists-new',
  templateUrl: './items-of-assay-lists-new.component.html',
  styleUrls: ['./items-of-assay-lists-new.component.scss'],
  providers: [
    ]
})

export class ItemsOfAssayListsNewComponent extends AppBaseComponent implements OnInit {
  itemsOfAssayListsForm: FormGroup;
  @Input() selectedItemsOfAssayLists: ItemsOfAssayLists;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ItemsOfAssayListsNewComponent>,
    public itemsOfAssayListsService: ItemsOfAssayListsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedItemsOfAssayLists = new ItemsOfAssayLists();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});


    this.itemsOfAssayListsForm = this.formBuilder.group({
     
  id : [0],
  assayNumber : [this.selectedItemsOfAssayLists.assayNumber, [ ]],
  listNumber : [this.selectedItemsOfAssayLists.listNumber, [ ]],
  itemNo : [this.selectedItemsOfAssayLists.itemNo, [ ]],
  itemQuantity : [this.selectedItemsOfAssayLists.itemQuantity, [ ]],
  estimatedValue : [this.selectedItemsOfAssayLists.estimatedValue, [ ]],
  processingType : [this.selectedItemsOfAssayLists.processingType, [ ]],
  offeringMethod : [this.selectedItemsOfAssayLists.offeringMethod, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.itemsOfAssayListsService.create(this.itemsOfAssayListsForm.value)
        .pipe(switchMap(x => {
			return this.itemsOfAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.itemsOfAssayListsForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
 }
