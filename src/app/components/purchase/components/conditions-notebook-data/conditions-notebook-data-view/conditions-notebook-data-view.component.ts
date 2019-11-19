
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ConditionsNotebookData } from 'app/shared/models/conditions-notebook-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ConditionsNotebookDataService } from '../shared/conditions-notebook-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-conditions-notebook-data-view',
  templateUrl: './conditions-notebook-data-view.component.html',
  styleUrls: ['./conditions-notebook-data-view.component.scss'],
  providers: []
})

export class ConditionsNotebookDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConditionsNotebookData: ConditionsNotebookData;
  conditionsNotebookDataForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConditionsNotebookDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConditionsNotebookDataViewComponent>,
    public conditionsNotebookDataService: ConditionsNotebookDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConditionsNotebookData = this.selectedConditionsNotebookDataDialog.data || this.selectedConditionsNotebookData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.conditionsNotebookDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedConditionsNotebookData.bidNumber],
  project : [this.selectedConditionsNotebookData.project],
  supplier : [this.selectedConditionsNotebookData.supplier],
  brochureValue : [this.selectedConditionsNotebookData.brochureValue],
  brochureNo : [this.selectedConditionsNotebookData.brochureNo],
  brochurePurchaseDate : [this.selectedConditionsNotebookData.brochurePurchaseDate],
  offeringType : [this.selectedConditionsNotebookData.offeringType]
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
    return this.conditionsNotebookDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.conditionsNotebookDataForm.controls)) {
      this.conditionsNotebookDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

