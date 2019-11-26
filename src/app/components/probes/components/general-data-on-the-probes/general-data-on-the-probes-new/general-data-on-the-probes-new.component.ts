
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GeneralDataOnTheProbes } from 'app/shared/models/general-data-on-the-probes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralDataOnTheProbesService } from '../shared/general-data-on-the-probes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-data-on-the-probes-new',
  templateUrl: './general-data-on-the-probes-new.component.html',
  styleUrls: ['./general-data-on-the-probes-new.component.scss'],
  providers: [
    ]
})

export class GeneralDataOnTheProbesNewComponent extends AppBaseComponent implements OnInit {
  generalDataOnTheProbesForm: FormGroup;
  @Input() selectedGeneralDataOnTheProbes: GeneralDataOnTheProbes;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GeneralDataOnTheProbesNewComponent>,
    public generalDataOnTheProbesService: GeneralDataOnTheProbesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDataOnTheProbes = new GeneralDataOnTheProbes();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});


    this.generalDataOnTheProbesForm = this.formBuilder.group({
     
  id : [0],
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
    this.generalDataOnTheProbesService.create(this.generalDataOnTheProbesForm.value)
        .pipe(switchMap(x => {
			return this.generalDataOnTheProbesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.generalDataOnTheProbesForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
 }
