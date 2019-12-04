import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeData } from 'app/shared/models/employee-data';

@Injectable()
export class ProfileService implements Resolve<any>
{
    employeeInfo: EmployeeData=new EmployeeData();;
    about: any;
    photosVideos: any;

    employeeInfoOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        
        // Set the defaults
        this.employeeInfoOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getemployeeInfo(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get employeeInfo
     */
    getemployeeInfo(): Promise<EmployeeData>
    {
        this.employeeInfo.id = 1;
        console.log(this.employeeInfo);
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8000/api/EmployeeData/getall', JSON.stringify(this.employeeInfo))
                .subscribe((employeeInfo: EmployeeData[]) => {
                    this.employeeInfo = employeeInfo[0];
                    this.employeeInfoOnChanged.next(this.employeeInfo);
                    resolve(this.employeeInfo);
                }, reject); 

        });
    }
}
