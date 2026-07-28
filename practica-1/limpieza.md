function venderProducto(id) {
  const productos = DB.get('productos');
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const cant = parseInt(prompt(`¿Cuántas unidades de "${p.nombre}" vendiste?`, '1'));
  if (!cant || cant <= 0) return;
  if (cant > p.stock) { alert('No hay suficiente stock.'); return; }
  p.stock -= cant;
  DB.set('productos', productos);
  renderProductos();
}

function renderProductos() {
  const q = (document.getElementById('buscarProd').value || '').toLowerCase();
  const productos = DB.get('productos').filter(p => p.nombre.toLowerCase().includes(q));
  const cont = document.getElementById('listaProductos');
  cont.innerHTML = productos.map(p => {
    const bajo = p.stock <= p.stockMinimo;
    return `<div class="card ${bajo ? 'bajo' : ''}">
      <strong>${p.nombre}</strong>
      <button class="mini" onclick="venderProducto('${p.id}')">Vender</button>
    </div>`;
  }).join('');
}
