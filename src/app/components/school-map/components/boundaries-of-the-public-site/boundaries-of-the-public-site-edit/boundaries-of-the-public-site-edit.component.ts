
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BoundariesOfThePublicSite } from 'app/shared/models/boundaries-of-the-public-site';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BoundariesOfThePublicSiteService } from '../shared/boundaries-of-the-public-site.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-boundaries-of-the-public-site-edit',
  templateUrl: './boundaries-of-the-public-site-edit.component.html',
  styleUrls: ['./boundaries-of-the-public-site-edit.component.scss'],
  providers: []
})

export class BoundariesOfThePublicSiteEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBoundariesOfThePublicSite: BoundariesOfThePublicSite;
  boundariesOfThePublicSiteForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBoundariesOfThePublicSiteDialog: any,
    @Optional() public dialogRef: MatDialogRef<BoundariesOfThePublicSiteEditComponent>,
    public boundariesOfThePublicSiteService: BoundariesOfThePublicSiteService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBoundariesOfThePublicSite = new BoundariesOfThePublicSite();
    this.selectedBoundariesOfThePublicSite = this.selectedBoundariesOfThePublicSiteDialog.data || this.selectedBoundariesOfThePublicSite;

    
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
      
  id : [this.selectedBoundariesOfThePublicSite.id],
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
    this.boundariesOfThePublicSiteService.update(this.boundariesOfThePublicSiteForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.boundariesOfThePublicSiteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.boundariesOfThePublicSiteForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
}
