
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DefiningANewToilet } from 'app/shared/models/defining-a-new-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DefiningANewToiletService } from '../shared/defining-a-new-toilet.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-defining-a-new-toilet-view',
  templateUrl: './defining-a-new-toilet-view.component.html',
  styleUrls: ['./defining-a-new-toilet-view.component.scss'],
  providers: []
})

export class DefiningANewToiletViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDefiningANewToilet: DefiningANewToilet;
  definingANewToiletForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDefiningANewToiletDialog: any,
    @Optional() public dialogRef: MatDialogRef<DefiningANewToiletViewComponent>,
    public definingANewToiletService: DefiningANewToiletService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefiningANewToilet = this.selectedDefiningANewToiletDialog.data || this.selectedDefiningANewToilet;

    

    this.definingANewToiletForm = this.formBuilder.group({
      
  toiletCode : [this.selectedDefiningANewToilet.toiletCode],
  toiletModel : [this.selectedDefiningANewToilet.toiletModel],
  productionDate : [this.selectedDefiningANewToilet.productionDate],
  manufacturerCode : [this.selectedDefiningANewToilet.manufacturerCode]
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
    return this.definingANewToiletForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.definingANewToiletForm.controls)) {
      this.definingANewToiletForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

