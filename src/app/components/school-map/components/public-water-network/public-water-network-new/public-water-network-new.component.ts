
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PublicWaterNetwork } from 'app/shared/models/public-water-network';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublicWaterNetworkService } from '../shared/public-water-network.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-public-water-network-new',
  templateUrl: './public-water-network-new.component.html',
  styleUrls: ['./public-water-network-new.component.scss'],
  providers: [
    ]
})

export class PublicWaterNetworkNewComponent extends AppBaseComponent implements OnInit {
  publicWaterNetworkForm: FormGroup;
  @Input() selectedPublicWaterNetwork: PublicWaterNetwork;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PublicWaterNetworkNewComponent>,
    public publicWaterNetworkService: PublicWaterNetworkService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublicWaterNetwork = new PublicWaterNetwork();

    
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


    this.publicWaterNetworkForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedPublicWaterNetwork.buildingCode, [ Validators.required ]],
  publicNetworkDiameter : [this.selectedPublicWaterNetwork.publicNetworkDiameter, [ Validators.required ]],
  distance : [this.selectedPublicWaterNetwork.distance, [ Validators.required ]],
  regionalCenterCode : [this.selectedPublicWaterNetwork.regionalCenterCode, [ ]],
  branchCode : [this.selectedPublicWaterNetwork.branchCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.publicWaterNetworkService.create(this.publicWaterNetworkForm.value)
        .pipe(switchMap(x => {
			return this.publicWaterNetworkService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.publicWaterNetworkForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
