
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InfluentialOcean } from 'app/shared/models/influential-ocean';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InfluentialOceanService } from '../shared/influential-ocean.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-influential-ocean-new',
  templateUrl: './influential-ocean-new.component.html',
  styleUrls: ['./influential-ocean-new.component.scss'],
  providers: [
    ]
})

export class InfluentialOceanNewComponent extends AppBaseComponent implements OnInit {
  influentialOceanForm: FormGroup;
  @Input() selectedInfluentialOcean: InfluentialOcean;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private effectTypeCodesService: LookupService;
private effectCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
effectTypeCodeSelectOptions: MaterialSelectOptions;
effectCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('effectTypeCode', { static: true }) EffectTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('effectCode', { static: true }) EffectCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InfluentialOceanNewComponent>,
    public influentialOceanService: InfluentialOceanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInfluentialOcean = new InfluentialOcean();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.effectTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع المؤثر',
	});

	this.effectCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المؤثر',
	});


    this.influentialOceanForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedInfluentialOcean.buildingCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedInfluentialOcean.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedInfluentialOcean.branchCode, [ Validators.required ]],
  effectTypeCode : [this.selectedInfluentialOcean.effectTypeCode, [ Validators.required ]],
  effectCode : [this.selectedInfluentialOcean.effectCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.influentialOceanService.create(this.influentialOceanForm.value)
        .pipe(switchMap(x => {
			return this.influentialOceanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.influentialOceanForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectCodesService = new LookupService('effectcodes', this.http);
  }
 }
