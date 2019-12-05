
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataEntryForm129AtTheManagementLevel } from 'app/shared/models/data-entry-form-129-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataEntryForm129AtTheManagementLevelService } from '../shared/data-entry-form-129-at-the-management-level.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-at-the-management-level-edit',
  templateUrl: './data-entry-form-129-at-the-management-level-edit.component.html',
  styleUrls: ['./data-entry-form-129-at-the-management-level-edit.component.scss'],
  providers: []
})

export class DataEntryForm129AtTheManagementLevelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129AtTheManagementLevel: DataEntryForm129AtTheManagementLevel;
  dataEntryForm129AtTheManagementLevelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private centralDepartmentsService: LookupService;

  
administrationOrBranchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranch', { static: true }) AdministrationOrBranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129AtTheManagementLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129AtTheManagementLevelEditComponent>,
    public dataEntryForm129AtTheManagementLevelService: DataEntryForm129AtTheManagementLevelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129AtTheManagementLevel = new DataEntryForm129AtTheManagementLevel();
    this.selectedDataEntryForm129AtTheManagementLevel = this.selectedDataEntryForm129AtTheManagementLevelDialog.data || this.selectedDataEntryForm129AtTheManagementLevel;

    
	this.administrationOrBranchSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره/الفرع',
	});


    this.dataEntryForm129AtTheManagementLevelForm = this.formBuilder.group({
      
  id : [this.selectedDataEntryForm129AtTheManagementLevel.id],
  incomingMonth : [this.selectedDataEntryForm129AtTheManagementLevel.incomingMonth, [ Validators.required ]],
  incomingNumber : [this.selectedDataEntryForm129AtTheManagementLevel.incomingNumber, [ Validators.required ]],
  administrationOrBranch : [this.selectedDataEntryForm129AtTheManagementLevel.administrationOrBranch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataEntryForm129AtTheManagementLevelService.update(this.dataEntryForm129AtTheManagementLevelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataEntryForm129AtTheManagementLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataEntryForm129AtTheManagementLevelForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
  }
}
