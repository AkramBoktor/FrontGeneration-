
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkSubitemsToTheMainItems } from 'app/shared/models/link-subitems-to-the-main-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkSubitemsToTheMainItemsService } from '../shared/link-subitems-to-the-main-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-subitems-to-the-main-items-view',
  templateUrl: './link-subitems-to-the-main-items-view.component.html',
  styleUrls: ['./link-subitems-to-the-main-items-view.component.scss'],
  providers: []
})

export class LinkSubitemsToTheMainItemsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkSubitemsToTheMainItems: LinkSubitemsToTheMainItems;
  linkSubitemsToTheMainItemsForm: FormGroup;

  private itemCodesService: LookupService;

  
mainIemNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkSubitemsToTheMainItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkSubitemsToTheMainItemsViewComponent>,
    public linkSubitemsToTheMainItemsService: LinkSubitemsToTheMainItemsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkSubitemsToTheMainItems = this.selectedLinkSubitemsToTheMainItemsDialog.data || this.selectedLinkSubitemsToTheMainItems;

    
	this.mainIemNumberSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم البند الرئيسي',
	});


    this.linkSubitemsToTheMainItemsForm = this.formBuilder.group({
      
  subItemNumber : [this.selectedLinkSubitemsToTheMainItems.subItemNumber],
  mainIemNumber : [this.selectedLinkSubitemsToTheMainItems.mainIemNumber]
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
    return this.linkSubitemsToTheMainItemsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkSubitemsToTheMainItemsForm.controls)) {
      this.linkSubitemsToTheMainItemsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

