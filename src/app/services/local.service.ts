import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string | null {
    return localStorage.getItem(key)
  }
  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }

  public checkData(key: string): boolean {
    return !!this.getData(key);
  }
}
