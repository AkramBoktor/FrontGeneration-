
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Thirdparties } from 'app/shared/models/thirdparties';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThirdpartiesService } from '../shared/thirdparties.service';

@Component({
  selector: 'app-thirdparties-view',
  templateUrl: './thirdparties-view.component.html',
  styleUrls: ['./thirdparties-view.component.scss'],
  providers: []
})

export class ThirdpartiesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThirdparties: Thirdparties;
  thirdpartiesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThirdpartiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThirdpartiesViewComponent>,
    public thirdpartiesService: ThirdpartiesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdparties = this.selectedThirdpartiesDialog.data || this.selectedThirdparties;

    

    this.thirdpartiesForm = this.formBuilder.group({
      
  thirdparty : [this.selectedThirdparties.thirdparty],
  thirdpartycode : [this.selectedThirdparties.thirdpartycode]
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
    return this.thirdpartiesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.thirdpartiesForm.controls)) {
      this.thirdpartiesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

