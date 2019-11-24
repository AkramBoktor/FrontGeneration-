
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InfluentialOcean } from 'app/shared/models/influential-ocean';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InfluentialOceanService } from '../shared/influential-ocean.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-influential-ocean-edit',
  templateUrl: './influential-ocean-edit.component.html',
  styleUrls: ['./influential-ocean-edit.component.scss'],
  providers: []
})

export class InfluentialOceanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInfluentialOcean: InfluentialOcean;
  influentialOceanForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInfluentialOceanDialog: any,
    @Optional() public dialogRef: MatDialogRef<InfluentialOceanEditComponent>,
    public influentialOceanService: InfluentialOceanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInfluentialOcean = new InfluentialOcean();
    this.selectedInfluentialOcean = this.selectedInfluentialOceanDialog.data || this.selectedInfluentialOcean;

    
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
      
  id : [this.selectedInfluentialOcean.id],
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
    this.influentialOceanService.update(this.influentialOceanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.influentialOceanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.influentialOceanForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectCodesService = new LookupService('effectcodes', this.http);
  }
}
