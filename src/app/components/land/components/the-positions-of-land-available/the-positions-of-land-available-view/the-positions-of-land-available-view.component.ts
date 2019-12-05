
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ThePositionsOfLandAvailable } from 'app/shared/models/the-positions-of-land-available';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePositionsOfLandAvailableService } from '../shared/the-positions-of-land-available.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-positions-of-land-available-view',
  templateUrl: './the-positions-of-land-available-view.component.html',
  styleUrls: ['./the-positions-of-land-available-view.component.scss'],
  providers: []
})

export class ThePositionsOfLandAvailableViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePositionsOfLandAvailable: ThePositionsOfLandAvailable;
  thePositionsOfLandAvailableForm: FormGroup;

  private documentCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePositionsOfLandAvailableDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePositionsOfLandAvailableViewComponent>,
    public thePositionsOfLandAvailableService: ThePositionsOfLandAvailableService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePositionsOfLandAvailable = this.selectedThePositionsOfLandAvailableDialog.data || this.selectedThePositionsOfLandAvailable;

    
	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});


    this.thePositionsOfLandAvailableForm = this.formBuilder.group({
      
  projectCode : [this.selectedThePositionsOfLandAvailable.projectCode],
  documentCode : [this.selectedThePositionsOfLandAvailable.documentCode]
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
    return this.thePositionsOfLandAvailableForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.thePositionsOfLandAvailableForm.controls)) {
      this.thePositionsOfLandAvailableForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}

