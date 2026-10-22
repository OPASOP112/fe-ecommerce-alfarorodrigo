import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Producto } from '../../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/api/productos`;

  listar() { return this.http.get<Producto[]>(this.API_URL); }
  crear(prod: Producto) { return this.http.post<Producto>(this.API_URL, prod); }
  actualizar(id: number, prod: Producto) { return this.http.put<Producto>(`${this.API_URL}/${id}`, prod); }
  eliminar(id: number) { return this.http.delete(`${this.API_URL}/${id}`); }
}