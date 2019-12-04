
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicDataForTheYouthCenter } from 'app/shared/models/basic-data-for-the-youth-center';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataForTheYouthCenterService } from '../shared/basic-data-for-the-youth-center.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-data-for-the-youth-center-new',
  templateUrl: './basic-data-for-the-youth-center-new.component.html',
  styleUrls: ['./basic-data-for-the-youth-center-new.component.scss'],
  providers: [
    ]
})

export class BasicDataForTheYouthCenterNewComponent extends AppBaseComponent implements OnInit {
  basicDataForTheYouthCenterForm: FormGroup;
  @Input() selectedBasicDataForTheYouthCenter: BasicDataForTheYouthCenter;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private regionalCenterCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
regionalCenterSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
neighborhoodVillageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenter', { static: true }) RegionalCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('neighborhoodVillage', { static: true }) NeighborhoodVillageSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BasicDataForTheYouthCenterNewComponent>,
    public basicDataForTheYouthCenterService: BasicDataForTheYouthCenterService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataForTheYouthCenter = new BasicDataForTheYouthCenter();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.regionalCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمى',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم / المركز',
	});

	this.neighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحى / القريه',
	});


    this.basicDataForTheYouthCenterForm = this.formBuilder.group({
     
  id : [0],
  centerName : [this.selectedBasicDataForTheYouthCenter.centerName, [ Validators.required ]],
  governorate : [this.selectedBasicDataForTheYouthCenter.governorate, [ Validators.required ]],
  regionalCenter : [this.selectedBasicDataForTheYouthCenter.regionalCenter, [ Validators.required ]],
  sectionCenter : [this.selectedBasicDataForTheYouthCenter.sectionCenter, [ Validators.required ]],
  neighborhoodVillage : [this.selectedBasicDataForTheYouthCenter.neighborhoodVillage, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.basicDataForTheYouthCenterService.create(this.basicDataForTheYouthCenterForm.value)
        .pipe(switchMap(x => {
			return this.basicDataForTheYouthCenterService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.basicDataForTheYouthCenterForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
 }
