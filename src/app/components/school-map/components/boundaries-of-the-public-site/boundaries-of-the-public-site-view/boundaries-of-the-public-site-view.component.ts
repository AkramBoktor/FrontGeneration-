
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BoundariesOfThePublicSite } from 'app/shared/models/boundaries-of-the-public-site';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BoundariesOfThePublicSiteService } from '../shared/boundaries-of-the-public-site.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-boundaries-of-the-public-site-view',
  templateUrl: './boundaries-of-the-public-site-view.component.html',
  styleUrls: ['./boundaries-of-the-public-site-view.component.scss'],
  providers: []
})

export class BoundariesOfThePublicSiteViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBoundariesOfThePublicSite: BoundariesOfThePublicSite;
  boundariesOfThePublicSiteForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
directionSelectOptions: MaterialSelectOptions;
neighborStateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBoundariesOfThePublicSiteDialog: any,
    @Optional() public dialogRef: MatDialogRef<BoundariesOfThePublicSiteViewComponent>,
    public boundariesOfThePublicSiteService: BoundariesOfThePublicSiteService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedBoundariesOfThePublicSite.buildingCode],
  length : [this.selectedBoundariesOfThePublicSite.length],
  slope : [this.selectedBoundariesOfThePublicSite.slope],
  description : [this.selectedBoundariesOfThePublicSite.description],
  regionalCenterCode : [this.selectedBoundariesOfThePublicSite.regionalCenterCode],
  branchCode : [this.selectedBoundariesOfThePublicSite.branchCode],
  direction : [this.selectedBoundariesOfThePublicSite.direction],
  neighborState : [this.selectedBoundariesOfThePublicSite.neighborState]
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
    return this.boundariesOfThePublicSiteForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.boundariesOfThePublicSiteForm.controls)) {
      this.boundariesOfThePublicSiteForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
}

