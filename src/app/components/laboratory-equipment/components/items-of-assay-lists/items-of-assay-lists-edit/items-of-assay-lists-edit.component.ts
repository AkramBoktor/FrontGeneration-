
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ItemsOfAssayLists } from 'app/shared/models/items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ItemsOfAssayListsService } from '../shared/items-of-assay-lists.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-items-of-assay-lists-edit',
  templateUrl: './items-of-assay-lists-edit.component.html',
  styleUrls: ['./items-of-assay-lists-edit.component.scss'],
  providers: []
})

export class ItemsOfAssayListsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedItemsOfAssayLists: ItemsOfAssayLists;
  itemsOfAssayListsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedItemsOfAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ItemsOfAssayListsEditComponent>,
    public itemsOfAssayListsService: ItemsOfAssayListsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedItemsOfAssayLists = new ItemsOfAssayLists();
    this.selectedItemsOfAssayLists = this.selectedItemsOfAssayListsDialog.data || this.selectedItemsOfAssayLists;

    
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
      
  id : [this.selectedItemsOfAssayLists.id],
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
    this.itemsOfAssayListsService.update(this.itemsOfAssayListsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.itemsOfAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.itemsOfAssayListsForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}
