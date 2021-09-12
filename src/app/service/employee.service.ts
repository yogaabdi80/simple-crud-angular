import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { Employee, EmployeeDashboard, Position } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/v1/api/employee';

  constructor(private http: HttpClient) { }

  getEmployeeMaster(): Observable<ApiResponse<EmployeeDashboard[]>> {
    return this.http.get<ApiResponse<EmployeeDashboard[]>>(this.baseUrl + "/getEmployeeMaster");
  }

  deleteEmployeeMaster(id: number): Observable<ApiResponse<EmployeeDashboard[]>> {
    return this.http.delete<ApiResponse<EmployeeDashboard[]>>(this.baseUrl + "/deleteEmployee/" + id);
  }

  saveEmployee(employee: Employee): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl + "/saveEmployee", employee);
  }

  getEmployee(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(this.baseUrl + "/getEmployee/" + id);
  }

  getPositions(): Observable<Position[]>{
    return this.http.get<Position[]>(this.baseUrl + "/getPositions");
  }
}
