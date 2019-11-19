
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ConditionsNotebookData } from 'app/shared/models/conditions-notebook-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ConditionsNotebookDataService } from '../shared/conditions-notebook-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-conditions-notebook-data-edit',
  templateUrl: './conditions-notebook-data-edit.component.html',
  styleUrls: ['./conditions-notebook-data-edit.component.scss'],
  providers: []
})

export class ConditionsNotebookDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConditionsNotebookData: ConditionsNotebookData;
  conditionsNotebookDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConditionsNotebookDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConditionsNotebookDataEditComponent>,
    public conditionsNotebookDataService: ConditionsNotebookDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConditionsNotebookData = new ConditionsNotebookData();
    this.selectedConditionsNotebookData = this.selectedConditionsNotebookDataDialog.data || this.selectedConditionsNotebookData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.conditionsNotebookDataForm = this.formBuilder.group({
      
  id : [this.selectedConditionsNotebookData.id],
  bidNumber : [this.selectedConditionsNotebookData.bidNumber, [ Validators.required ]],
  project : [this.selectedConditionsNotebookData.project, [ Validators.required ]],
  supplier : [this.selectedConditionsNotebookData.supplier, [ Validators.required ]],
  brochureValue : [this.selectedConditionsNotebookData.brochureValue, [ Validators.required ]],
  brochureNo : [this.selectedConditionsNotebookData.brochureNo, [ Validators.required ]],
  brochurePurchaseDate : [this.selectedConditionsNotebookData.brochurePurchaseDate, [ Validators.required ]],
  offeringType : [this.selectedConditionsNotebookData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.conditionsNotebookDataService.update(this.conditionsNotebookDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.conditionsNotebookDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.conditionsNotebookDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
