
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FenceFile } from 'app/shared/models/fence-file';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FenceFileService } from '../shared/fence-file.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-fence-file-new',
  templateUrl: './fence-file-new.component.html',
  styleUrls: ['./fence-file-new.component.scss'],
  providers: [
    ]
})

export class FenceFileNewComponent extends AppBaseComponent implements OnInit {
  fenceFileForm: FormGroup;
  @Input() selectedFenceFile: FenceFile;
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
    @Optional() public dialogRef: MatDialogRef<FenceFileNewComponent>,
    public fenceFileService: FenceFileService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFenceFile = new FenceFile();

    
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
     
  id : [0],
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
    this.fenceFileService.create(this.fenceFileForm.value)
        .pipe(switchMap(x => {
			return this.fenceFileService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
