import BoMGenerator from './BoMGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Bill of Material (BoM) Generator</h1>
        <BoMGenerator />
      </div>
    </div>
  );
}