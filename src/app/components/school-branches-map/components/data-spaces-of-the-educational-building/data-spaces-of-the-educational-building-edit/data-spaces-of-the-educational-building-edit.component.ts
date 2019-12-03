
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataSpacesOfTheEducationalBuilding } from 'app/shared/models/data-spaces-of-the-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataSpacesOfTheEducationalBuildingService } from '../shared/data-spaces-of-the-educational-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-spaces-of-the-educational-building-edit',
  templateUrl: './data-spaces-of-the-educational-building-edit.component.html',
  styleUrls: ['./data-spaces-of-the-educational-building-edit.component.scss'],
  providers: []
})

export class DataSpacesOfTheEducationalBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataSpacesOfTheEducationalBuilding: DataSpacesOfTheEducationalBuilding;
  dataSpacesOfTheEducationalBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;

  
codeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('code', { static: true }) CodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataSpacesOfTheEducationalBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataSpacesOfTheEducationalBuildingEditComponent>,
    public dataSpacesOfTheEducationalBuildingService: DataSpacesOfTheEducationalBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataSpacesOfTheEducationalBuilding = new DataSpacesOfTheEducationalBuilding();
    this.selectedDataSpacesOfTheEducationalBuilding = this.selectedDataSpacesOfTheEducationalBuildingDialog.data || this.selectedDataSpacesOfTheEducationalBuilding;

    
	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ',
	});


    this.dataSpacesOfTheEducationalBuildingForm = this.formBuilder.group({
      
  id : [this.selectedDataSpacesOfTheEducationalBuilding.id],
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
    this.dataSpacesOfTheEducationalBuildingService.update(this.dataSpacesOfTheEducationalBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataSpacesOfTheEducationalBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataSpacesOfTheEducationalBuildingForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
