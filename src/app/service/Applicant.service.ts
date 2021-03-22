import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from './Message.service';
import {catchError, tap} from 'rxjs/operators';
import {Applicant} from '../model/Appicant';

@Injectable({providedIn: 'root'})
export class ApplicantService {
  private httpUrl = "http://localhost:8091/api/applicant";
  constructor(private httpClient: HttpClient, private messageService: MessageService) {}
  addApplicantToCourse(applicant: Applicant, status: string, courseName: string): Observable<Applicant>{
    return this.httpClient.post<Applicant>(`${this.httpUrl}?name=${courseName}&status=${status}`, applicant).pipe(
      tap(_ => this.log(`added applicant to ${courseName} course. `)),
      catchError(this.handleError<Applicant>('add applicant to course'))
    );
  }
  getApplicantByEmail(email: string): Observable<Applicant>{
    return this.httpClient.get<Applicant>(`${this.httpUrl}/_search?email=${email}`).pipe(
      tap(_ => this.log(`feching applicant with emial = ${email}`)),
      catchError(this.handleError<Applicant>("fetching applicant. "))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ApplicantService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`UserService: ${message}`);
  }

}
