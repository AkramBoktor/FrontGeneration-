
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SpecializationData } from 'app/shared/models/specialization-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SpecializationDataService } from '../shared/specialization-data.service';

@Component({
  selector: 'app-specialization-data-view',
  templateUrl: './specialization-data-view.component.html',
  styleUrls: ['./specialization-data-view.component.scss'],
  providers: []
})

export class SpecializationDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSpecializationData: SpecializationData;
  specializationDataForm: FormGroup;

  private areasService: LookupService;

  
administrationOrRegionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSpecializationDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SpecializationDataViewComponent>,
    public specializationDataService: SpecializationDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecializationData = this.selectedSpecializationDataDialog.data || this.selectedSpecializationData;

    
	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة او المنطقه',
	});


    this.specializationDataForm = this.formBuilder.group({
      
  fiscalYear : [this.selectedSpecializationData.fiscalYear],
  product : [this.selectedSpecializationData.product],
  allocated : [this.selectedSpecializationData.allocated],
  spent : [this.selectedSpecializationData.spent],
  administrationOrRegion : [this.selectedSpecializationData.administrationOrRegion]
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
    return this.specializationDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.specializationDataForm.controls)) {
      this.specializationDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}

