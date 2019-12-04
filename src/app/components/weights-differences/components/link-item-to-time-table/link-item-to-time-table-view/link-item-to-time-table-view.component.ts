
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkItemToTimeTable } from 'app/shared/models/link-item-to-time-table';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkItemToTimeTableService } from '../shared/link-item-to-time-table.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-item-to-time-table-view',
  templateUrl: './link-item-to-time-table-view.component.html',
  styleUrls: ['./link-item-to-time-table-view.component.scss'],
  providers: []
})

export class LinkItemToTimeTableViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkItemToTimeTable: LinkItemToTimeTable;
  linkItemToTimeTableForm: FormGroup;

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkItemToTimeTableDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkItemToTimeTableViewComponent>,
    public linkItemToTimeTableService: LinkItemToTimeTableService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemToTimeTable = this.selectedLinkItemToTimeTableDialog.data || this.selectedLinkItemToTimeTable;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.linkItemToTimeTableForm = this.formBuilder.group({
      
  itemName : [this.selectedLinkItemToTimeTable.itemName],
  activityCode : [this.selectedLinkItemToTimeTable.activityCode],
  activityName : [this.selectedLinkItemToTimeTable.activityName],
  itemCode : [this.selectedLinkItemToTimeTable.itemCode]
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
    return this.linkItemToTimeTableForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkItemToTimeTableForm.controls)) {
      this.linkItemToTimeTableForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

