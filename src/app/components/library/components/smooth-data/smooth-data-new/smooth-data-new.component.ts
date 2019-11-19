
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SmoothData } from 'app/shared/models/smooth-data';
import { switchMap } from 'rxjs/operators';
import { SmoothDataService } from '../shared/smooth-data.service';


@Component({
  selector: 'app-smooth-data-new',
  templateUrl: './smooth-data-new.component.html',
  styleUrls: ['./smooth-data-new.component.scss'],
  providers: [
    ]
})

export class SmoothDataNewComponent extends AppBaseComponent implements OnInit {
  smoothDataForm: FormGroup;
  @Input() selectedSmoothData: SmoothData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SmoothDataNewComponent>,
    public smoothDataService: SmoothDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSmoothData = new SmoothData();

    

    this.smoothDataForm = this.formBuilder.group({
     
  id : [0],
  seriesCode : [this.selectedSmoothData.seriesCode, [ Validators.required ]],
  seriesTitle : [this.selectedSmoothData.seriesTitle, [ Validators.required ]],
  bookNumber : [this.selectedSmoothData.bookNumber, [ Validators.required ]],
  bookTitle : [this.selectedSmoothData.bookTitle, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.smoothDataService.create(this.smoothDataForm.value)
        .pipe(switchMap(x => {
			return this.smoothDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.smoothDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
