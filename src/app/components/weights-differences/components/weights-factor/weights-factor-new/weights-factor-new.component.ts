
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { WeightsFactor } from 'app/shared/models/weights-factor';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { WeightsFactorService } from '../shared/weights-factor.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-weights-factor-new',
  templateUrl: './weights-factor-new.component.html',
  styleUrls: ['./weights-factor-new.component.scss'],
  providers: [
    ]
})

export class WeightsFactorNewComponent extends AppBaseComponent implements OnInit {
  weightsFactorForm: FormGroup;
  @Input() selectedWeightsFactor: WeightsFactor;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<WeightsFactorNewComponent>,
    public weightsFactorService: WeightsFactorService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWeightsFactor = new WeightsFactor();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.weightsFactorForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedWeightsFactor.buildingCode, [ Validators.required ]],
  tenderNumber : [this.selectedWeightsFactor.tenderNumber, [ ]],
  tenderName : [this.selectedWeightsFactor.tenderName, [ ]],
  contractorCode : [this.selectedWeightsFactor.contractorCode, [ Validators.required ]],
  supplementSeries : [this.selectedWeightsFactor.supplementSeries, [ ]],
  dateOfOpeningTechnicalAttribution : [this.selectedWeightsFactor.dateOfOpeningTechnicalAttribution, [ Validators.required ]],
  assayPriceCategory : [this.selectedWeightsFactor.assayPriceCategory, [ Validators.required ]],
  ratioOfWeightsCoefficient : [this.selectedWeightsFactor.ratioOfWeightsCoefficient, [ Validators.required ]],
  offeringType : [this.selectedWeightsFactor.offeringType, [ ]],
  itemCode : [this.selectedWeightsFactor.itemCode, [ Validators.required ]],
  elementCode : [this.selectedWeightsFactor.elementCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.weightsFactorService.create(this.weightsFactorForm.value)
        .pipe(switchMap(x => {
			return this.weightsFactorService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.weightsFactorForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
 }
