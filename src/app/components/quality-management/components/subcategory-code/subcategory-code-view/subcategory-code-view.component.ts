
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubcategoryCode } from 'app/shared/models/subcategory-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubcategoryCodeService } from '../shared/subcategory-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subcategory-code-view',
  templateUrl: './subcategory-code-view.component.html',
  styleUrls: ['./subcategory-code-view.component.scss'],
  providers: []
})

export class SubcategoryCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubcategoryCode: SubcategoryCode;
  subcategoryCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubcategoryCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubcategoryCodeViewComponent>,
    public subcategoryCodeService: SubcategoryCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubcategoryCode = this.selectedSubcategoryCodeDialog.data || this.selectedSubcategoryCode;

    

    this.subcategoryCodeForm = this.formBuilder.group({
      
  subMaterialCode : [this.selectedSubcategoryCode.subMaterialCode],
  subMaterialName : [this.selectedSubcategoryCode.subMaterialName]
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
    return this.subcategoryCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subcategoryCodeForm.controls)) {
      this.subcategoryCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

