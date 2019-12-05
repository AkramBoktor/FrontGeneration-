
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BindingItemsWithElementsCodes } from 'app/shared/models/binding-items-with-elements-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BindingItemsWithElementsCodesService } from '../shared/binding-items-with-elements-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-binding-items-with-elements-codes-edit',
  templateUrl: './binding-items-with-elements-codes-edit.component.html',
  styleUrls: ['./binding-items-with-elements-codes-edit.component.scss'],
  providers: []
})

export class BindingItemsWithElementsCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBindingItemsWithElementsCodes: BindingItemsWithElementsCodes;
  bindingItemsWithElementsCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBindingItemsWithElementsCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BindingItemsWithElementsCodesEditComponent>,
    public bindingItemsWithElementsCodesService: BindingItemsWithElementsCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemsWithElementsCodes = new BindingItemsWithElementsCodes();
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
      
  id : [this.selectedBindingItemsWithElementsCodes.id],
  itemCode : [this.selectedBindingItemsWithElementsCodes.itemCode, [ Validators.required ]],
  elementCode : [this.selectedBindingItemsWithElementsCodes.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.bindingItemsWithElementsCodesService.update(this.bindingItemsWithElementsCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.bindingItemsWithElementsCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.bindingItemsWithElementsCodesForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}
