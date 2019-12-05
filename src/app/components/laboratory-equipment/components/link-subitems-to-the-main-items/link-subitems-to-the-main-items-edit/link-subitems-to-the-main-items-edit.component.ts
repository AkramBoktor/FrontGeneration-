
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkSubitemsToTheMainItems } from 'app/shared/models/link-subitems-to-the-main-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkSubitemsToTheMainItemsService } from '../shared/link-subitems-to-the-main-items.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-subitems-to-the-main-items-edit',
  templateUrl: './link-subitems-to-the-main-items-edit.component.html',
  styleUrls: ['./link-subitems-to-the-main-items-edit.component.scss'],
  providers: []
})

export class LinkSubitemsToTheMainItemsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkSubitemsToTheMainItems: LinkSubitemsToTheMainItems;
  linkSubitemsToTheMainItemsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;

  
mainIemNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainIemNumber', { static: true }) MainIemNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkSubitemsToTheMainItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkSubitemsToTheMainItemsEditComponent>,
    public linkSubitemsToTheMainItemsService: LinkSubitemsToTheMainItemsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkSubitemsToTheMainItems = new LinkSubitemsToTheMainItems();
    this.selectedLinkSubitemsToTheMainItems = this.selectedLinkSubitemsToTheMainItemsDialog.data || this.selectedLinkSubitemsToTheMainItems;

    
	this.mainIemNumberSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم البند الرئيسي',
	});


    this.linkSubitemsToTheMainItemsForm = this.formBuilder.group({
      
  id : [this.selectedLinkSubitemsToTheMainItems.id],
  subItemNumber : [this.selectedLinkSubitemsToTheMainItems.subItemNumber, [ ]],
  mainIemNumber : [this.selectedLinkSubitemsToTheMainItems.mainIemNumber, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkSubitemsToTheMainItemsService.update(this.linkSubitemsToTheMainItemsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkSubitemsToTheMainItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkSubitemsToTheMainItemsForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
