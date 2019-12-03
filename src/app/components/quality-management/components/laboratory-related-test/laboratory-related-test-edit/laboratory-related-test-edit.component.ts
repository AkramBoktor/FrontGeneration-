
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LaboratoryRelatedTest } from 'app/shared/models/laboratory-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LaboratoryRelatedTestService } from '../shared/laboratory-related-test.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-laboratory-related-test-edit',
  templateUrl: './laboratory-related-test-edit.component.html',
  styleUrls: ['./laboratory-related-test-edit.component.scss'],
  providers: []
})

export class LaboratoryRelatedTestEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLaboratoryRelatedTest: LaboratoryRelatedTest;
  laboratoryRelatedTestForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLaboratoryRelatedTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<LaboratoryRelatedTestEditComponent>,
    public laboratoryRelatedTestService: LaboratoryRelatedTestService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratoryRelatedTest = new LaboratoryRelatedTest();
    this.selectedLaboratoryRelatedTest = this.selectedLaboratoryRelatedTestDialog.data || this.selectedLaboratoryRelatedTest;

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.laboratoryRelatedTestForm = this.formBuilder.group({
      
  id : [this.selectedLaboratoryRelatedTest.id],
  basicMaterialCode : [this.selectedLaboratoryRelatedTest.basicMaterialCode, [ Validators.required ]],
  subMaterialCode : [this.selectedLaboratoryRelatedTest.subMaterialCode, [ Validators.required ]],
  testCode : [this.selectedLaboratoryRelatedTest.testCode, [ Validators.required ]],
  laboratoryCode : [this.selectedLaboratoryRelatedTest.laboratoryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.laboratoryRelatedTestService.update(this.laboratoryRelatedTestForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.laboratoryRelatedTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.laboratoryRelatedTestForm.get(name);
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}
