import { useState } from "react";

export default function BoMGenerator() {
  const [product, setProduct] = useState("");
  const [bomData, setBomData] = useState({
    "Power Supply 12V": [
      { nama: "Transformator", spesifikasi: "220V to 12V 2A", jumlah: 1, harga: 25000 },
    ],
  });

  const [newProduct, setNewProduct] = useState("");
  const [newComponent, setNewComponent] = useState({
    nama: "",
    spesifikasi: "",
    jumlah: 1,
    harga: 0
  });

  const [tempComponents, setTempComponents] = useState([]);

  const bomList = bomData[product] || [];
  const total = bomList.reduce((acc, item) => acc + item.harga * item.jumlah, 0);

  const addTempComponent = () => {
    setTempComponents([...tempComponents, newComponent]);
    setNewComponent({ nama: "", spesifikasi: "", jumlah: 1, harga: 0 });
  };

  const saveNewProduct = () => {
    if (newProduct && tempComponents.length > 0) {
      setBomData({ ...bomData, [newProduct]: tempComponents });
      setNewProduct("");
      setTempComponents([]);
    }
  };

  return (
    <div>
      <label htmlFor="product" className="block text-lg font-semibold text-gray-700">
        Cari Produk yang Ada:
      </label>
      <input
        id="product"
        placeholder="Contoh: Power Supply 12V"
        className="mt-3 mb-6 border border-blue-300 rounded-xl px-4 py-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      {bomList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-blue-300 rounded-xl shadow-md">
            <thead>
              <tr className="bg-blue-200 text-blue-800">
                <th>No</th><th>Nama Komponen</th><th>Spesifikasi</th>
                <th>Jumlah</th><th>Harga Satuan</th><th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bomList.map((item, i) => (
                <tr key={i}>
                  <td>{i+1}</td><td>{item.nama}</td><td>{item.spesifikasi}</td>
                  <td>{item.jumlah}</td><td>Rp{item.harga.toLocaleString()}</td>
                  <td>Rp{(item.harga*item.jumlah).toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-bold bg-blue-100">
                <td colSpan={5}>Total Harga</td>
                <td>Rp{total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : product !== "" ? <p>Produk tidak ditemukan.</p> : null}

      <hr className="my-8" />
      <h2>Tambah Produk Baru</h2>
      <input type="text" placeholder="Nama Produk" value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)} />

      <div>
        <input type="text" placeholder="Nama Komponen" value={newComponent.nama}
          onChange={(e) => setNewComponent({ ...newComponent, nama: e.target.value })} />
        <input type="text" placeholder="Spesifikasi" value={newComponent.spesifikasi}
          onChange={(e) => setNewComponent({ ...newComponent, spesifikasi: e.target.value })} />
        <input type="number" placeholder="Jumlah" value={newComponent.jumlah}
          onChange={(e) => setNewComponent({ ...newComponent, jumlah: parseInt(e.target.value) })} />
        <input type="number" placeholder="Harga" value={newComponent.harga}
          onChange={(e) => setNewComponent({ ...newComponent, harga: parseInt(e.target.value) })} />
        <button onClick={addTempComponent}>Tambah Komponen</button>
      </div>

      {tempComponents.length > 0 && (
        <>
          <ul>
            {tempComponents.map((comp, i) => (
              <li key={i}>{comp.nama} - {comp.spesifikasi} - {comp.jumlah} pcs @Rp{comp.harga}</li>
            ))}
          </ul>
          <button onClick={saveNewProduct}>Simpan Produk</button>
        </>
      )}
    </div>
  );
}
