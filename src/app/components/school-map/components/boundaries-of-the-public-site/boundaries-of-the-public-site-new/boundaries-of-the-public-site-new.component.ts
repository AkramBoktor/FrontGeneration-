
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BoundariesOfThePublicSite } from 'app/shared/models/boundaries-of-the-public-site';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BoundariesOfThePublicSiteService } from '../shared/boundaries-of-the-public-site.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-boundaries-of-the-public-site-new',
  templateUrl: './boundaries-of-the-public-site-new.component.html',
  styleUrls: ['./boundaries-of-the-public-site-new.component.scss'],
  providers: [
    ]
})

export class BoundariesOfThePublicSiteNewComponent extends AppBaseComponent implements OnInit {
  boundariesOfThePublicSiteForm: FormGroup;
  @Input() selectedBoundariesOfThePublicSite: BoundariesOfThePublicSite;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
directionSelectOptions: MaterialSelectOptions;
neighborStateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('direction', { static: true }) DirectionSelectComponent: MaterialSelectComponent;
	@ViewChild('neighborState', { static: true }) NeighborStateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BoundariesOfThePublicSiteNewComponent>,
    public boundariesOfThePublicSiteService: BoundariesOfThePublicSiteService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBoundariesOfThePublicSite = new BoundariesOfThePublicSite();

    
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

	this.directionSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'أتجاه الحد',
	});

	this.neighborStateSelectOptions = new MaterialSelectOptions({
	 data: this.neighborStatesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الجار الملاصق',
	});


    this.boundariesOfThePublicSiteForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedBoundariesOfThePublicSite.buildingCode, [ Validators.required ]],
  length : [this.selectedBoundariesOfThePublicSite.length, [ Validators.required ]],
  slope : [this.selectedBoundariesOfThePublicSite.slope, [ Validators.required ]],
  description : [this.selectedBoundariesOfThePublicSite.description, [ Validators.required ]],
  regionalCenterCode : [this.selectedBoundariesOfThePublicSite.regionalCenterCode, [ ]],
  branchCode : [this.selectedBoundariesOfThePublicSite.branchCode, [ ]],
  direction : [this.selectedBoundariesOfThePublicSite.direction, [ ]],
  neighborState : [this.selectedBoundariesOfThePublicSite.neighborState, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.boundariesOfThePublicSiteService.create(this.boundariesOfThePublicSiteForm.value)
        .pipe(switchMap(x => {
			return this.boundariesOfThePublicSiteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.boundariesOfThePublicSiteForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
 }
