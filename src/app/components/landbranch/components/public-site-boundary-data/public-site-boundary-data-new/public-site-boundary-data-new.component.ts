
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PublicSiteBoundaryData } from 'app/shared/models/public-site-boundary-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PublicSiteBoundaryDataService } from '../shared/public-site-boundary-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-public-site-boundary-data-new',
  templateUrl: './public-site-boundary-data-new.component.html',
  styleUrls: ['./public-site-boundary-data-new.component.scss'],
  providers: [
    ]
})

export class PublicSiteBoundaryDataNewComponent extends AppBaseComponent implements OnInit {
  publicSiteBoundaryDataForm: FormGroup;
  @Input() selectedPublicSiteBoundaryData: PublicSiteBoundaryData;
  errorMessages: FormControlError[] = [
        
  ];

  private yesOrNosService: LookupService;
private fenceStatusCodesService: LookupService;

  
hasNeighborSelectOptions: MaterialSelectOptions;
fenceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hasNeighbor', { static: true }) HasNeighborSelectComponent: MaterialSelectComponent;
	@ViewChild('fence', { static: true }) FenceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PublicSiteBoundaryDataNewComponent>,
    public publicSiteBoundaryDataService: PublicSiteBoundaryDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublicSiteBoundaryData = new PublicSiteBoundaryData();

    
	this.hasNeighborSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد جار؟',
	});

	this.fenceSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سور',
	});


    this.publicSiteBoundaryDataForm = this.formBuilder.group({
     
  id : [0],
  landCode : [this.selectedPublicSiteBoundaryData.landCode, [ Validators.required ]],
  averageSiteLevel : [this.selectedPublicSiteBoundaryData.averageSiteLevel, [ Validators.required ]],
  proposedAverageYardLevel : [this.selectedPublicSiteBoundaryData.proposedAverageYardLevel, [ Validators.required ]],
  highestPointLevel : [this.selectedPublicSiteBoundaryData.highestPointLevel, [ Validators.required ]],
  lowestPointLevel : [this.selectedPublicSiteBoundaryData.lowestPointLevel, [ Validators.required ]],
  borderName : [this.selectedPublicSiteBoundaryData.borderName, [ Validators.required ]],
  borderLength : [this.selectedPublicSiteBoundaryData.borderLength, [ Validators.required ]],
  neighborLevel : [this.selectedPublicSiteBoundaryData.neighborLevel, [ Validators.required ]],
  neighborDescription : [this.selectedPublicSiteBoundaryData.neighborDescription, [ Validators.required ]],
  hasNeighbor : [this.selectedPublicSiteBoundaryData.hasNeighbor, [ Validators.required ]],
  fence : [this.selectedPublicSiteBoundaryData.fence, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.publicSiteBoundaryDataService.create(this.publicSiteBoundaryDataForm.value)
        .pipe(switchMap(x => {
			return this.publicSiteBoundaryDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.publicSiteBoundaryDataForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
  }
 }
