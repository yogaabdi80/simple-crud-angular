export class EmployeeDashboard {
    id: number = null;
    name: string = null;
    birthDate: Date = new Date();
    jabatan: string = null;
    nip: number = null;
    gender: number = null;
    isDelete: number = null;
}

export class Employee {
    id: number = null;
    name: string = null;
    birthDate: Date = null;
    idJabatan: string = null;
    nip: number = null;
    gender: number = null;
    positionList: Position[] = []
    isDelete: number = null;
}

export class Position {
    id: number = null;
    code: string = null;
    name: string = null;
    isDelete: number = null;
}