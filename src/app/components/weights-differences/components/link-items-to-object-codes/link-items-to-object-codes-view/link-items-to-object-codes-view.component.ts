
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkItemsToObjectCodes } from 'app/shared/models/link-items-to-object-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkItemsToObjectCodesService } from '../shared/link-items-to-object-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-items-to-object-codes-view',
  templateUrl: './link-items-to-object-codes-view.component.html',
  styleUrls: ['./link-items-to-object-codes-view.component.scss'],
  providers: []
})

export class LinkItemsToObjectCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkItemsToObjectCodes: LinkItemsToObjectCodes;
  linkItemsToObjectCodesForm: FormGroup;

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkItemsToObjectCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkItemsToObjectCodesViewComponent>,
    public linkItemsToObjectCodesService: LinkItemsToObjectCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemsToObjectCodes = this.selectedLinkItemsToObjectCodesDialog.data || this.selectedLinkItemsToObjectCodes;

    
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


    this.linkItemsToObjectCodesForm = this.formBuilder.group({
      
  itemCode : [this.selectedLinkItemsToObjectCodes.itemCode],
  elementCode : [this.selectedLinkItemsToObjectCodes.elementCode]
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
    return this.linkItemsToObjectCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkItemsToObjectCodesForm.controls)) {
      this.linkItemsToObjectCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

