
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GeneralDataOnTheProbes } from 'app/shared/models/general-data-on-the-probes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GeneralDataOnTheProbesService } from '../shared/general-data-on-the-probes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-data-on-the-probes-edit',
  templateUrl: './general-data-on-the-probes-edit.component.html',
  styleUrls: ['./general-data-on-the-probes-edit.component.scss'],
  providers: []
})

export class GeneralDataOnTheProbesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralDataOnTheProbes: GeneralDataOnTheProbes;
  generalDataOnTheProbesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralDataOnTheProbesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralDataOnTheProbesEditComponent>,
    public generalDataOnTheProbesService: GeneralDataOnTheProbesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDataOnTheProbes = new GeneralDataOnTheProbes();
    this.selectedGeneralDataOnTheProbes = this.selectedGeneralDataOnTheProbesDialog.data || this.selectedGeneralDataOnTheProbes;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});


    this.generalDataOnTheProbesForm = this.formBuilder.group({
      
  id : [this.selectedGeneralDataOnTheProbes.id],
  schoolName : [this.selectedGeneralDataOnTheProbes.schoolName, [ Validators.required ]],
  coordinatesX : [this.selectedGeneralDataOnTheProbes.coordinatesX, [ ]],
  coordinatesY : [this.selectedGeneralDataOnTheProbes.coordinatesY, [ ]],
  groundLevel : [this.selectedGeneralDataOnTheProbes.groundLevel, [ ]],
  totalSaltsPercentage : [this.selectedGeneralDataOnTheProbes.totalSaltsPercentage, [ Validators.required ]],
  carbonateRatio : [this.selectedGeneralDataOnTheProbes.carbonateRatio, [ Validators.required ]],
  chloridesRatio : [this.selectedGeneralDataOnTheProbes.chloridesRatio, [ Validators.required ]],
  sulfateRatio : [this.selectedGeneralDataOnTheProbes.sulfateRatio, [ Validators.required ]],
  foundationDepth : [this.selectedGeneralDataOnTheProbes.foundationDepth, [ Validators.required ]],
  foundationEffort : [this.selectedGeneralDataOnTheProbes.foundationEffort, [ Validators.required ]],
  foundationsProposedType : [this.selectedGeneralDataOnTheProbes.foundationsProposedType, [ Validators.required ]],
  executingAgency : [this.selectedGeneralDataOnTheProbes.executingAgency, [ Validators.required ]],
  governorate : [this.selectedGeneralDataOnTheProbes.governorate, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.generalDataOnTheProbesService.update(this.generalDataOnTheProbesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.generalDataOnTheProbesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.generalDataOnTheProbesForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}
