import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from './Message.service';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../model/User';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpUrl = 'http://localhost:8091/api/user/';
  constructor(private httpClient: HttpClient, private messageService: MessageService) {}
  getUserByEmail(email: string): Observable<User>{
    return this.httpClient.get<User>(`${this.httpUrl}email/${email}`).pipe(
      tap(_ => this.log(`feching user with email = ${email}`)),
      catchError(this.handleError<User>('fetching user.'))
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
