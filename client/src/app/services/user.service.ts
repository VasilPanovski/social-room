import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Constants } from './../constants/constants';
import { AuthenticationService } from './authentication.service'

const UserByIdUrl: string = Constants.hostUrl + 'api/users/user/';
const SetProfileUrl: string = Constants.hostUrl + 'api/users/user/set/';
const GetLoggedUserUrl: string = Constants.hostUrl + 'api/auth/getLoggedUser';
const AuthToken: string = Constants.authToken;
const PeopleUrl: string = Constants.hostUrl + 'api/users/people';

@Injectable()
export class UserService {
    public loggedUser: any;

    constructor(
        private http: Http) {
    }

    public getAllUsers(): Observable<any> {
      return this.http.get(PeopleUrl).map((response: Response) => response.json());
    }

    public getUserData(userId: string): Observable<any> {
        let url = `${UserByIdUrl}${userId}`;
        return this.http.get(url).map((response: Response) => response.json());
    }

    public getLoggedUser(): Observable<any> {
        let token = localStorage.getItem(AuthToken);
        let jwt =  {
            'token': token
        }

        return this.http.post(GetLoggedUserUrl, jwt, {withCredentials: true})

            .map((res: Response) => {
                let body = res.json();
                this.loggedUser = body.user;

                return {
                    status: res.status,
                    user: body.user
                };
            });
    }

    public isLoggedIn(): Observable<boolean> {
        let userDataString: string = localStorage.getItem(AuthToken);
        if (!userDataString) {
            return Observable.of(false);
        }

        return this.getLoggedUser()
            .map((res: any) => {
                if (+res.status == 200) {
                    return true;
                }
                return false;
            })
    }

    public updateSettings(id: any, settings: any): Observable<any> {

        return this.http.put(`${UserByIdUrl}${id}`, settings, {withCredentials: true})
            .map((res: Response) => {
                return { status: res.status, body: res.json() }
            })
    }

}

