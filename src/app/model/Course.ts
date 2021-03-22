import {Applicant} from './Appicant';

export interface Course{
  id: number;
  courseName: string;
  teacherName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  applicantSet: Applicant[];
}
