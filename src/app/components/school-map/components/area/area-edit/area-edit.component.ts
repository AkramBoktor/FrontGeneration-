
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Area } from 'app/shared/models/area';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AreaService } from '../shared/area.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss'],
  providers: []
})

export class AreaEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedArea: Area;
  areaForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAreaDialog: any,
    @Optional() public dialogRef: MatDialogRef<AreaEditComponent>,
    public areaService: AreaService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArea = new Area();
    this.selectedArea = this.selectedAreaDialog.data || this.selectedArea;

    
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


    this.areaForm = this.formBuilder.group({
      
  id : [this.selectedArea.id],
  buildingCode : [this.selectedArea.buildingCode, [ Validators.required ]],
  groundFloorArea : [this.selectedArea.groundFloorArea, [ Validators.required ]],
  backyardArea : [this.selectedArea.backyardArea, [ Validators.required ]],
  greenAreas : [this.selectedArea.greenAreas, [ Validators.required ]],
  playgroundArea : [this.selectedArea.playgroundArea, [ Validators.required ]],
  sideWalksArea : [this.selectedArea.sideWalksArea, [ Validators.required ]],
  siteTotalArea : [this.selectedArea.siteTotalArea, [ Validators.required ]],
  regionalCenterCode : [this.selectedArea.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedArea.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.areaService.update(this.areaForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.areaService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.areaForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
