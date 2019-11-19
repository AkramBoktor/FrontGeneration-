
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GroupDetailsData } from 'app/shared/models/group-details-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { GroupDetailsDataService } from '../shared/group-details-data.service';


@Component({
  selector: 'app-group-details-data-new',
  templateUrl: './group-details-data-new.component.html',
  styleUrls: ['./group-details-data-new.component.scss'],
  providers: [
    ]
})

export class GroupDetailsDataNewComponent extends AppBaseComponent implements OnInit {
  groupDetailsDataForm: FormGroup;
  @Input() selectedGroupDetailsData: GroupDetailsData;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GroupDetailsDataNewComponent>,
    public groupDetailsDataService: GroupDetailsDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGroupDetailsData = new GroupDetailsData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});


    this.groupDetailsDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedGroupDetailsData.bidNumber, [ Validators.min(1) ]],
  project : [this.selectedGroupDetailsData.project, [ Validators.required ]],
  durationImplementationInMonths : [this.selectedGroupDetailsData.durationImplementationInMonths, [ Validators.required ]],
  buildingType : [this.selectedGroupDetailsData.buildingType, [ Validators.required ]],
  offeringType : [this.selectedGroupDetailsData.offeringType, [ Validators.required ]],
  educationalAdministration : [this.selectedGroupDetailsData.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.groupDetailsDataService.create(this.groupDetailsDataForm.value)
        .pipe(switchMap(x => {
			return this.groupDetailsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.groupDetailsDataForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
