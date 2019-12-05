
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataEntryForm129AtTheManagementLevel } from 'app/shared/models/data-entry-form-129-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129AtTheManagementLevelService } from '../shared/data-entry-form-129-at-the-management-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-at-the-management-level-view',
  templateUrl: './data-entry-form-129-at-the-management-level-view.component.html',
  styleUrls: ['./data-entry-form-129-at-the-management-level-view.component.scss'],
  providers: []
})

export class DataEntryForm129AtTheManagementLevelViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129AtTheManagementLevel: DataEntryForm129AtTheManagementLevel;
  dataEntryForm129AtTheManagementLevelForm: FormGroup;

  private centralDepartmentsService: LookupService;

  
administrationOrBranchSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129AtTheManagementLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129AtTheManagementLevelViewComponent>,
    public dataEntryForm129AtTheManagementLevelService: DataEntryForm129AtTheManagementLevelService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129AtTheManagementLevel = this.selectedDataEntryForm129AtTheManagementLevelDialog.data || this.selectedDataEntryForm129AtTheManagementLevel;

    
	this.administrationOrBranchSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره/الفرع',
	});


    this.dataEntryForm129AtTheManagementLevelForm = this.formBuilder.group({
      
  incomingMonth : [this.selectedDataEntryForm129AtTheManagementLevel.incomingMonth],
  incomingNumber : [this.selectedDataEntryForm129AtTheManagementLevel.incomingNumber],
  administrationOrBranch : [this.selectedDataEntryForm129AtTheManagementLevel.administrationOrBranch]
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
    return this.dataEntryForm129AtTheManagementLevelForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataEntryForm129AtTheManagementLevelForm.controls)) {
      this.dataEntryForm129AtTheManagementLevelForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
  }
}

