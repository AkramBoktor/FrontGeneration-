
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DrugsInformation } from 'app/shared/models/drugs-information';
import { switchMap } from 'rxjs/operators';
import { DrugsInformationService } from '../shared/drugs-information.service';


@Component({
  selector: 'app-drugs-information-new',
  templateUrl: './drugs-information-new.component.html',
  styleUrls: ['./drugs-information-new.component.scss'],
  providers: [
    ]
})

export class DrugsInformationNewComponent extends AppBaseComponent implements OnInit {
  drugsInformationForm: FormGroup;
  @Input() selectedDrugsInformation: DrugsInformation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DrugsInformationNewComponent>,
    public drugsInformationService: DrugsInformationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrugsInformation = new DrugsInformation();

    

    this.drugsInformationForm = this.formBuilder.group({
     
  id : [0],
  drugName : [this.selectedDrugsInformation.drugName, [ Validators.required ]],
  drugCode : [this.selectedDrugsInformation.drugCode, [ Validators.required ]],
  quantity : [this.selectedDrugsInformation.quantity, [ Validators.required ]],
  supplier : [this.selectedDrugsInformation.supplier, [ Validators.required ]],
  storagePlace : [this.selectedDrugsInformation.storagePlace, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.drugsInformationService.create(this.drugsInformationForm.value)
        .pipe(switchMap(x => {
			return this.drugsInformationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.drugsInformationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
