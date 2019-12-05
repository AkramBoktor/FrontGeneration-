
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LaboratoryRelatedTest } from 'app/shared/models/laboratory-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LaboratoryRelatedTestService } from '../shared/laboratory-related-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-laboratory-related-test-view',
  templateUrl: './laboratory-related-test-view.component.html',
  styleUrls: ['./laboratory-related-test-view.component.scss'],
  providers: []
})

export class LaboratoryRelatedTestViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLaboratoryRelatedTest: LaboratoryRelatedTest;
  laboratoryRelatedTestForm: FormGroup;

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLaboratoryRelatedTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<LaboratoryRelatedTestViewComponent>,
    public laboratoryRelatedTestService: LaboratoryRelatedTestService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratoryRelatedTest = this.selectedLaboratoryRelatedTestDialog.data || this.selectedLaboratoryRelatedTest;

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.laboratoryRelatedTestForm = this.formBuilder.group({
      
  basicMaterialCode : [this.selectedLaboratoryRelatedTest.basicMaterialCode],
  subMaterialCode : [this.selectedLaboratoryRelatedTest.subMaterialCode],
  testCode : [this.selectedLaboratoryRelatedTest.testCode],
  laboratoryCode : [this.selectedLaboratoryRelatedTest.laboratoryCode]
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
    return this.laboratoryRelatedTestForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.laboratoryRelatedTestForm.controls)) {
      this.laboratoryRelatedTestForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}

