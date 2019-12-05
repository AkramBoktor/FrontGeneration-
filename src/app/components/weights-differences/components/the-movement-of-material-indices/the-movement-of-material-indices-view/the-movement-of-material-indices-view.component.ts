
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheMovementOfMaterialIndices } from 'app/shared/models/the-movement-of-material-indices';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheMovementOfMaterialIndicesService } from '../shared/the-movement-of-material-indices.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-movement-of-material-indices-view',
  templateUrl: './the-movement-of-material-indices-view.component.html',
  styleUrls: ['./the-movement-of-material-indices-view.component.scss'],
  providers: []
})

export class TheMovementOfMaterialIndicesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheMovementOfMaterialIndices: TheMovementOfMaterialIndices;
  theMovementOfMaterialIndicesForm: FormGroup;

  private elementsService: LookupService;

  
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheMovementOfMaterialIndicesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheMovementOfMaterialIndicesViewComponent>,
    public theMovementOfMaterialIndicesService: TheMovementOfMaterialIndicesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheMovementOfMaterialIndices = this.selectedTheMovementOfMaterialIndicesDialog.data || this.selectedTheMovementOfMaterialIndices;

    
	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.theMovementOfMaterialIndicesForm = this.formBuilder.group({
      
  startDateForMovement : [this.selectedTheMovementOfMaterialIndices.startDateForMovement],
  endDateForMovement : [this.selectedTheMovementOfMaterialIndices.endDateForMovement],
  standardNumber : [this.selectedTheMovementOfMaterialIndices.standardNumber],
  elementCode : [this.selectedTheMovementOfMaterialIndices.elementCode]
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
    return this.theMovementOfMaterialIndicesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theMovementOfMaterialIndicesForm.controls)) {
      this.theMovementOfMaterialIndicesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.elementsService = new LookupService('elements', this.http);
  }
}

