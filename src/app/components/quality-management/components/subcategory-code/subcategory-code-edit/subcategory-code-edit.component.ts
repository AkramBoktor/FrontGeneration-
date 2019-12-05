
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubcategoryCode } from 'app/shared/models/subcategory-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubcategoryCodeService } from '../shared/subcategory-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subcategory-code-edit',
  templateUrl: './subcategory-code-edit.component.html',
  styleUrls: ['./subcategory-code-edit.component.scss'],
  providers: []
})

export class SubcategoryCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubcategoryCode: SubcategoryCode;
  subcategoryCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubcategoryCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubcategoryCodeEditComponent>,
    public subcategoryCodeService: SubcategoryCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubcategoryCode = new SubcategoryCode();
    this.selectedSubcategoryCode = this.selectedSubcategoryCodeDialog.data || this.selectedSubcategoryCode;

    

    this.subcategoryCodeForm = this.formBuilder.group({
      
  id : [this.selectedSubcategoryCode.id],
  subMaterialCode : [this.selectedSubcategoryCode.subMaterialCode, [ Validators.required ]],
  subMaterialName : [this.selectedSubcategoryCode.subMaterialName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subcategoryCodeService.update(this.subcategoryCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subcategoryCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subcategoryCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
