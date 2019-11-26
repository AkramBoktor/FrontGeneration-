
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialType } from 'app/shared/models/material-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MaterialTypeService } from '../shared/material-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-material-type-edit',
  templateUrl: './material-type-edit.component.html',
  styleUrls: ['./material-type-edit.component.scss'],
  providers: []
})

export class MaterialTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaterialType: MaterialType;
  materialTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaterialTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaterialTypeEditComponent>,
    public materialTypeService: MaterialTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaterialType = new MaterialType();
    this.selectedMaterialType = this.selectedMaterialTypeDialog.data || this.selectedMaterialType;

    

    this.materialTypeForm = this.formBuilder.group({
      
  id : [this.selectedMaterialType.id],
  code : [this.selectedMaterialType.code, [ Validators.required ]],
  name : [this.selectedMaterialType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.materialTypeService.update(this.materialTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.materialTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.materialTypeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
