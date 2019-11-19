
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Thirdparties } from 'app/shared/models/thirdparties';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThirdpartiesService } from '../shared/thirdparties.service';
import { ThirdpartiesEditComponent } from '../thirdparties-edit/thirdparties-edit.component';
import { ThirdpartiesNewComponent } from '../thirdparties-new/thirdparties-new.component';
import { ThirdpartiesViewComponent } from '../thirdparties-view/thirdparties-view.component';

@Component({
  selector: 'app-thirdparties-list',
  templateUrl: './thirdparties-list.component.html',
  styleUrls: ['./thirdparties-list.component.scss'],
  providers: []
})

export class ThirdpartiesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedThirdparties: Thirdparties;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'جهة خارجية', field: 'thirdparty' }),
	new GridColumnOptions({ headerName: 'كود الجهة الخارجية', field: 'thirdpartycode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ThirdpartiesViewComponent,
    editDialogClassType: ThirdpartiesEditComponent,
    newDialogClassType: ThirdpartiesNewComponent,
  });
    constructor(
        injector: Injector,
        public thirdpartiesService: ThirdpartiesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedThirdparties = new Thirdparties();

    

    this.searchForm = this.formBuilder.group({
     	thirdparty : [],
	thirdpartycode : []
    });

     
  }

  getThirdpartiesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Thirdparties[]> => {
    return this.thirdpartiesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.thirdpartiesService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

