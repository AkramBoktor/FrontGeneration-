
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GeneralDataOnTheProbes } from 'app/shared/models/general-data-on-the-probes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralDataOnTheProbesService } from '../shared/general-data-on-the-probes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-data-on-the-probes-view',
  templateUrl: './general-data-on-the-probes-view.component.html',
  styleUrls: ['./general-data-on-the-probes-view.component.scss'],
  providers: []
})

export class GeneralDataOnTheProbesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralDataOnTheProbes: GeneralDataOnTheProbes;
  generalDataOnTheProbesForm: FormGroup;

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralDataOnTheProbesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralDataOnTheProbesViewComponent>,
    public generalDataOnTheProbesService: GeneralDataOnTheProbesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDataOnTheProbes = this.selectedGeneralDataOnTheProbesDialog.data || this.selectedGeneralDataOnTheProbes;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});


    this.generalDataOnTheProbesForm = this.formBuilder.group({
      
  schoolName : [this.selectedGeneralDataOnTheProbes.schoolName],
  coordinatesX : [this.selectedGeneralDataOnTheProbes.coordinatesX],
  coordinatesY : [this.selectedGeneralDataOnTheProbes.coordinatesY],
  groundLevel : [this.selectedGeneralDataOnTheProbes.groundLevel],
  totalSaltsPercentage : [this.selectedGeneralDataOnTheProbes.totalSaltsPercentage],
  carbonateRatio : [this.selectedGeneralDataOnTheProbes.carbonateRatio],
  chloridesRatio : [this.selectedGeneralDataOnTheProbes.chloridesRatio],
  sulfateRatio : [this.selectedGeneralDataOnTheProbes.sulfateRatio],
  foundationDepth : [this.selectedGeneralDataOnTheProbes.foundationDepth],
  foundationEffort : [this.selectedGeneralDataOnTheProbes.foundationEffort],
  foundationsProposedType : [this.selectedGeneralDataOnTheProbes.foundationsProposedType],
  executingAgency : [this.selectedGeneralDataOnTheProbes.executingAgency],
  governorate : [this.selectedGeneralDataOnTheProbes.governorate]
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
    return this.generalDataOnTheProbesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.generalDataOnTheProbesForm.controls)) {
      this.generalDataOnTheProbesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

