import {Status} from './Status';
import {Course} from './Course';

export interface Applicant {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: Status;
  course: Course;
}
