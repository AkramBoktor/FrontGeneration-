
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayModel } from 'app/shared/models/assay-model';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayModelService } from '../shared/assay-model.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-model-edit',
  templateUrl: './assay-model-edit.component.html',
  styleUrls: ['./assay-model-edit.component.scss'],
  providers: []
})

export class AssayModelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayModel: AssayModel;
  assayModelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private formTypesService: LookupService;

  
modelTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelType', { static: true }) ModelTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayModelDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayModelEditComponent>,
    public assayModelService: AssayModelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayModel = new AssayModel();
    this.selectedAssayModel = this.selectedAssayModelDialog.data || this.selectedAssayModel;

    
	this.modelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.formTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النموذج',
	});


    this.assayModelForm = this.formBuilder.group({
      
  id : [this.selectedAssayModel.id],
  code : [this.selectedAssayModel.code, [ Validators.required ]],
  name : [this.selectedAssayModel.name, [ Validators.required ]],
  modelType : [this.selectedAssayModel.modelType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assayModelService.update(this.assayModelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayModelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayModelForm.get(name);
  }

  initializeLookupServices() {
    this.formTypesService = new LookupService('formtypes', this.http);
  }
}
