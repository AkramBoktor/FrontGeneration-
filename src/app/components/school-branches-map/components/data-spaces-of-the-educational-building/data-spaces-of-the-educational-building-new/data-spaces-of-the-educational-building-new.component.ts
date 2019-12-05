
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataSpacesOfTheEducationalBuilding } from 'app/shared/models/data-spaces-of-the-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataSpacesOfTheEducationalBuildingService } from '../shared/data-spaces-of-the-educational-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-spaces-of-the-educational-building-new',
  templateUrl: './data-spaces-of-the-educational-building-new.component.html',
  styleUrls: ['./data-spaces-of-the-educational-building-new.component.scss'],
  providers: [
    ]
})

export class DataSpacesOfTheEducationalBuildingNewComponent extends AppBaseComponent implements OnInit {
  dataSpacesOfTheEducationalBuildingForm: FormGroup;
  @Input() selectedDataSpacesOfTheEducationalBuilding: DataSpacesOfTheEducationalBuilding;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;

  
codeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('code', { static: true }) CodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataSpacesOfTheEducationalBuildingNewComponent>,
    public dataSpacesOfTheEducationalBuildingService: DataSpacesOfTheEducationalBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataSpacesOfTheEducationalBuilding = new DataSpacesOfTheEducationalBuilding();

    
	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ',
	});


    this.dataSpacesOfTheEducationalBuildingForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedDataSpacesOfTheEducationalBuilding.buildingCode, [ Validators.required ]],
  extension : [this.selectedDataSpacesOfTheEducationalBuilding.extension, [ Validators.required ]],
  floor : [this.selectedDataSpacesOfTheEducationalBuilding.floor, [ Validators.required ]],
  spaceName : [this.selectedDataSpacesOfTheEducationalBuilding.spaceName, [ Validators.required ]],
  area : [this.selectedDataSpacesOfTheEducationalBuilding.area, [ Validators.required ]],
  series : [this.selectedDataSpacesOfTheEducationalBuilding.series, [ Validators.required ]],
  code : [this.selectedDataSpacesOfTheEducationalBuilding.code, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataSpacesOfTheEducationalBuildingService.create(this.dataSpacesOfTheEducationalBuildingForm.value)
        .pipe(switchMap(x => {
			return this.dataSpacesOfTheEducationalBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataSpacesOfTheEducationalBuildingForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
