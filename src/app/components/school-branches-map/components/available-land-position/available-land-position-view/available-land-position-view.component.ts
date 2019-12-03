
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AvailableLandPosition } from 'app/shared/models/available-land-position';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AvailableLandPositionService } from '../shared/available-land-position.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-available-land-position-view',
  templateUrl: './available-land-position-view.component.html',
  styleUrls: ['./available-land-position-view.component.scss'],
  providers: []
})

export class AvailableLandPositionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAvailableLandPosition: AvailableLandPosition;
  availableLandPositionForm: FormGroup;

  private documentCodesService: LookupService;

  
documentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAvailableLandPositionDialog: any,
    @Optional() public dialogRef: MatDialogRef<AvailableLandPositionViewComponent>,
    public availableLandPositionService: AvailableLandPositionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAvailableLandPosition = this.selectedAvailableLandPositionDialog.data || this.selectedAvailableLandPosition;

    
	this.documentSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المستند',
	});


    this.availableLandPositionForm = this.formBuilder.group({
      
  projectCode : [this.selectedAvailableLandPosition.projectCode],
  document : [this.selectedAvailableLandPosition.document]
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
    return this.availableLandPositionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.availableLandPositionForm.controls)) {
      this.availableLandPositionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}

