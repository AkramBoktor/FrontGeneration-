
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Adequacy } from 'app/shared/models/adequacy';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AdequacyService } from '../shared/adequacy.service';

@Component({
  selector: 'app-adequacy-view',
  templateUrl: './adequacy-view.component.html',
  styleUrls: ['./adequacy-view.component.scss'],
  providers: []
})

export class AdequacyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdequacy: Adequacy;
  adequacyForm: FormGroup;

  private overallAppreciationsService: LookupService;

  
overallAppreciationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdequacyDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdequacyViewComponent>,
    public adequacyService: AdequacyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdequacy = this.selectedAdequacyDialog.data || this.selectedAdequacy;

    
	this.overallAppreciationSelectOptions = new MaterialSelectOptions({
	 data: this.overallAppreciationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التقدير العام',
	});


    this.adequacyForm = this.formBuilder.group({
      
  employeeCode : [this.selectedAdequacy.employeeCode],
  adequacyYear : [this.selectedAdequacy.adequacyYear],
  degree : [this.selectedAdequacy.degree],
  employeeName : [this.selectedAdequacy.employeeName],
  overallAppreciation : [this.selectedAdequacy.overallAppreciation]
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
          
	{
	 errorName: 'maxLength',
	 errorMessage: 'اكبر درجة هي 100'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'اقل درجة هي 0'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.adequacyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.adequacyForm.controls)) {
      this.adequacyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.overallAppreciationsService = new LookupService('overallappreciations', this.http);
  }
}

