
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FenceFile } from 'app/shared/models/fence-file';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FenceFileService } from '../shared/fence-file.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-fence-file-edit',
  templateUrl: './fence-file-edit.component.html',
  styleUrls: ['./fence-file-edit.component.scss'],
  providers: []
})

export class FenceFileEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFenceFile: FenceFile;
  fenceFileForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private fenceStatusCodesService: LookupService;
private constructionMaterialsService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
fenceStatusCodeSelectOptions: MaterialSelectOptions;
constructionMaterialSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('fenceStatusCode', { static: true }) FenceStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionMaterial', { static: true }) ConstructionMaterialSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFenceFileDialog: any,
    @Optional() public dialogRef: MatDialogRef<FenceFileEditComponent>,
    public fenceFileService: FenceFileService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFenceFile = new FenceFile();
    this.selectedFenceFile = this.selectedFenceFileDialog.data || this.selectedFenceFile;

    
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

	this.fenceStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة السور',
	});

	this.constructionMaterialSelectOptions = new MaterialSelectOptions({
	 data: this.constructionMaterialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مادة البناء',
	});


    this.fenceFileForm = this.formBuilder.group({
      
  id : [this.selectedFenceFile.id],
  buildingCode : [this.selectedFenceFile.buildingCode, [ Validators.required ]],
  fenceCode : [this.selectedFenceFile.fenceCode, [ Validators.required ]],
  fenceHight : [this.selectedFenceFile.fenceHight, [ Validators.required ]],
  northSideLength : [this.selectedFenceFile.northSideLength, [ Validators.required ]],
  southSideLength : [this.selectedFenceFile.southSideLength, [ Validators.required ]],
  eastSideLength : [this.selectedFenceFile.eastSideLength, [ Validators.required ]],
  westSideLength : [this.selectedFenceFile.westSideLength, [ Validators.required ]],
  northEastSideLength : [this.selectedFenceFile.northEastSideLength, [ Validators.required ]],
  southEastSidelength : [this.selectedFenceFile.southEastSidelength, [ Validators.required ]],
  northWestLength : [this.selectedFenceFile.northWestLength, [ Validators.required ]],
  southWestLength : [this.selectedFenceFile.southWestLength, [ Validators.required ]],
  regionalCenterCode : [this.selectedFenceFile.regionalCenterCode, [ ]],
  branchCode : [this.selectedFenceFile.branchCode, [ ]],
  fenceStatusCode : [this.selectedFenceFile.fenceStatusCode, [ Validators.required ]],
  constructionMaterial : [this.selectedFenceFile.constructionMaterial, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.fenceFileService.update(this.fenceFileForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.fenceFileService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.fenceFileForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
this.constructionMaterialsService = new LookupService('constructionmaterials', this.http);
  }
}
