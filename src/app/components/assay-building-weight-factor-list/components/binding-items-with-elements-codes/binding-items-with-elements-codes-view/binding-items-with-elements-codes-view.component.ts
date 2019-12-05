
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BindingItemsWithElementsCodes } from 'app/shared/models/binding-items-with-elements-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BindingItemsWithElementsCodesService } from '../shared/binding-items-with-elements-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-binding-items-with-elements-codes-view',
  templateUrl: './binding-items-with-elements-codes-view.component.html',
  styleUrls: ['./binding-items-with-elements-codes-view.component.scss'],
  providers: []
})

export class BindingItemsWithElementsCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBindingItemsWithElementsCodes: BindingItemsWithElementsCodes;
  bindingItemsWithElementsCodesForm: FormGroup;

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBindingItemsWithElementsCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BindingItemsWithElementsCodesViewComponent>,
    public bindingItemsWithElementsCodesService: BindingItemsWithElementsCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemsWithElementsCodes = this.selectedBindingItemsWithElementsCodesDialog.data || this.selectedBindingItemsWithElementsCodes;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.bindingItemsWithElementsCodesForm = this.formBuilder.group({
      
  itemCode : [this.selectedBindingItemsWithElementsCodes.itemCode],
  elementCode : [this.selectedBindingItemsWithElementsCodes.elementCode]
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
    return this.bindingItemsWithElementsCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.bindingItemsWithElementsCodesForm.controls)) {
      this.bindingItemsWithElementsCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

