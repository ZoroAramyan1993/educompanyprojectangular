import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './Message.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Course} from '../model/Course';
import {Applicant} from '../model/Appicant';

@Injectable({providedIn: 'root'})
export class HomeService{
  constructor(private http:HttpClient, private messageService: MessageService) {}

  private url: string = "http://localhost:8091/api/courses";

  getCourceByName(courseName: string): Observable<Course>{
    return this.http.get<Course>(`${this.url}/${courseName}`).pipe(
      tap(_ => this.log(`fetching courses by name ${courseName}`)),
      catchError(this.handleError<Course>('fetching course by Name'))
    );
  }
  deleteCourse(courseName: string){
    return this.http.delete<any>(`${this.url}/${courseName}/delete`).pipe(
      tap(_ => this.log(`deleting courses by id ${courseName}`)),
      catchError(this.handleError('deleting  course'))
    );
  }
  updateCourse(course: Course): Observable<Course>{
    return this.http.put<Course>(`${this.url}/${course.courseName}/update`, course).pipe(
      tap(_ => this.log(`updated course by ${course.courseName} coursename `)),
      catchError(this.handleError<Course>('updated  course'))
    );
  }
  saveCourse(course: Course): Observable<Course>{
  //  const c = {id: null, courseName: course.courseName, teacherName: course.teacherName, description: course.description, startDate: null, endDate: null};
    return this.http.post<Course>(this.url, course).pipe(
      tap(_ => this.log(`adding course with name ${course.courseName}`)),
      catchError(this.handleError<Course>('added new course'))
    );
  }

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.url).pipe(
      tap(_ => this.log("fetching courses")),
      catchError(this.handleError<Course[]>('fetching courses'))
    );
  }

  getAllApplicants(): Observable<Applicant[]>{
    return this.http.get<Applicant[]>(this.url).pipe(
      tap(_ => this.log("fetching applicants")),
      catchError(this.handleError<Applicant[]>('fetching applicants'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`HomeService: ${message}`);
  }

}
// https://www.codejava.net/frameworks/spring-boot/pdf-export-example
// https://www.angulareasily.com/2019/03/viewdownload-pdf-and-excel-file-in.html
// https://stackoverflow.com/questions/60857619/how-to-download-pdf-file-in-angular-generated-by-springboot-at-runtime
