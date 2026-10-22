import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  private productoService = inject(ProductoService);
  
  productos = signal<Producto[]>([]);
  
  nuevoProducto: Producto = this.limpiarFormulario();

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe(data => this.productos.set(data));
  }

  guardarProducto() {
    if (this.nuevoProducto.id) {
      this.productoService.actualizar(this.nuevoProducto.id, this.nuevoProducto).subscribe(() => {
        this.cargarProductos();
        this.nuevoProducto = this.limpiarFormulario();
      });
    } else {
      // Crear
      this.productoService.crear(this.nuevoProducto).subscribe(() => {
        this.cargarProductos();
        this.nuevoProducto = this.limpiarFormulario();
      });
    }
  }

  editarProducto(prod: Producto) {
    this.nuevoProducto = { ...prod };
  }

  eliminarProducto(id: number | undefined) {
    if (id && confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => this.cargarProductos());
    }
  }

  limpiarFormulario(): Producto {
    return { nombre: '', categoria: '', precio: 0, stock: 0, marca: '', codigoBarras: '' };
  }
}