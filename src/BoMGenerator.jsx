import { useState } from "react";

const bomData = {
  "Power Supply 12V": [
    { nama: "Transformator", spesifikasi: "220V to 12V 2A", jumlah: 1, harga: 25000 },
    { nama: "Dioda Bridge", spesifikasi: "1A", jumlah: 1, harga: 2000 },
    { nama: "Kapasitor Elco", spesifikasi: "1000uF 25V", jumlah: 2, harga: 1500 },
    { nama: "IC Regulator", spesifikasi: "7812", jumlah: 1, harga: 1500 },
    { nama: "Heatsink", spesifikasi: "Aluminium kecil", jumlah: 1, harga: 2000 }
  ],
  "Sensor Suhu Digital": [
    { nama: "Sensor DS18B20", spesifikasi: "Waterproof", jumlah: 1, harga: 15000 },
    { nama: "Resistor 4.7kΩ", spesifikasi: "1/4 Watt", jumlah: 1, harga: 200 },
    { nama: "Kabel Jumper", spesifikasi: "20cm male to female", jumlah: 3, harga: 500 }
  ],
  "Sensor Kelembapan": [
    { nama: "Hygrometer DHT22", spesifikasi: "Waterproof", jumlah: 1, harga: 25000 },
    { nama: "Resistor 10kΩ", spesifikasi: "1/4 Watt", jumlah: 1, harga: 200 },
    { nama: "Kabel Jumper", spesifikasi: "20cm male to female", jumlah: 2, harga: 500 }
  ]
};

export default function BoMGenerator() {
  const [product, setProduct] = useState("");

  const bomList = bomData[product] || [];
  const total = bomList.reduce((acc, item) => acc + item.harga * item.jumlah, 0);

  return (
    <div>
      <label htmlFor="product" className="block text-gray-700 font-semibold">Masukkan Nama Produk:</label>
      <input
        id="product"
        placeholder="Contoh: Power Supply 12V"
        className="mt-2 mb-4 border border-gray-300 rounded px-3 py-2 w-full"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      {bomList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-2 py-1">No</th>
                <th className="px-2 py-1">Nama Komponen</th>
                <th className="px-2 py-1">Spesifikasi</th>
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Harga Satuan</th>
                <th className="px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {bomList.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.spesifikasi}</td>
                  <td className="text-center">{item.jumlah}</td>
                  <td className="text-right">Rp{item.harga.toLocaleString()}</td>
                  <td className="text-right">Rp{(item.harga * item.jumlah).toLocaleString()}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right font-semibold">Total Harga</td>
                <td className="font-bold text-right">Rp{total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : product !== "" ? (
        <p className="text-red-500 mt-2">Produk tidak ditemukan dalam database.</p>
      ) : null}
    </div>
  );
}