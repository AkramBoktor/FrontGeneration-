
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkItemsToObjectCodes } from 'app/shared/models/link-items-to-object-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkItemsToObjectCodesService } from '../shared/link-items-to-object-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-items-to-object-codes-edit',
  templateUrl: './link-items-to-object-codes-edit.component.html',
  styleUrls: ['./link-items-to-object-codes-edit.component.scss'],
  providers: []
})

export class LinkItemsToObjectCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkItemsToObjectCodes: LinkItemsToObjectCodes;
  linkItemsToObjectCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkItemsToObjectCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkItemsToObjectCodesEditComponent>,
    public linkItemsToObjectCodesService: LinkItemsToObjectCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemsToObjectCodes = new LinkItemsToObjectCodes();
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
      
  id : [this.selectedLinkItemsToObjectCodes.id],
  itemCode : [this.selectedLinkItemsToObjectCodes.itemCode, [ Validators.required ]],
  elementCode : [this.selectedLinkItemsToObjectCodes.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkItemsToObjectCodesService.update(this.linkItemsToObjectCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkItemsToObjectCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkItemsToObjectCodesForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}
