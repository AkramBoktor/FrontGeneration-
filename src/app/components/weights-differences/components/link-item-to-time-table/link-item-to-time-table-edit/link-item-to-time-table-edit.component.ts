
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkItemToTimeTable } from 'app/shared/models/link-item-to-time-table';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkItemToTimeTableService } from '../shared/link-item-to-time-table.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-item-to-time-table-edit',
  templateUrl: './link-item-to-time-table-edit.component.html',
  styleUrls: ['./link-item-to-time-table-edit.component.scss'],
  providers: []
})

export class LinkItemToTimeTableEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkItemToTimeTable: LinkItemToTimeTable;
  linkItemToTimeTableForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkItemToTimeTableDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkItemToTimeTableEditComponent>,
    public linkItemToTimeTableService: LinkItemToTimeTableService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemToTimeTable = new LinkItemToTimeTable();
    this.selectedLinkItemToTimeTable = this.selectedLinkItemToTimeTableDialog.data || this.selectedLinkItemToTimeTable;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.linkItemToTimeTableForm = this.formBuilder.group({
      
  id : [this.selectedLinkItemToTimeTable.id],
  itemName : [this.selectedLinkItemToTimeTable.itemName, [ ]],
  activityCode : [this.selectedLinkItemToTimeTable.activityCode, [ Validators.required ]],
  activityName : [this.selectedLinkItemToTimeTable.activityName, [ ]],
  itemCode : [this.selectedLinkItemToTimeTable.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkItemToTimeTableService.update(this.linkItemToTimeTableForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkItemToTimeTableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkItemToTimeTableForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
