"use client";

import { useState } from "react";
import Image from "next/image";
import '@fortawesome/fontawesome-free';

export default function Prijava() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prijava:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-200">
      {/* Glavni kontejner */}
      <div className="flex flex-col lg:flex-row w-full m-2 h-screen bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Lijeva strana - Slika (Samo za desktop) */}
        <div className="w-full lg:w-1/2 relative">
          <Image
            src="/images/backgroundprijava.jpg"
            alt="Pozadinska slika hrane"
            layout="fill"
            objectFit="cover"
            className="h-full hidden lg:block"
          />
        </div>

        {/* Desna strana - Prijava */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-beige-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-brown-800 mb-6">Dobrodošli natrag!</h2>
          <p className="text-center text-brown-600 mb-4">
            Nemaš račun? <a href="/registracija" className="text-green-600 hover:underline">Registriraj se</a>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-brown-700">Email</label>
              <input
                type="email"
                placeholder="Unesite email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-beige-300 text-brown-800 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Lozinka */}
            <div>
              <label className="block text-sm font-semibold text-brown-700">Lozinka</label>
              <input
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-beige-300 text-brown-800 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-transform transform hover:scale-105"
            >
              Prijavi se
            </button>
          </form>

          {/* Alternativne prijave */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-brown-300" />
            <span className="mx-2 text-brown-600">ILI</span>
            <hr className="flex-grow border-brown-300" />
          </div>

          <div className="flex justify-center space-x-4">
            <i className="fab fa-google p-3 text-gray-700 hover:text-black"></i>
            <i className="fab fa-facebook-f p-3 text-gray-700 hover:text-black"></i>
            <i className="fab fa-instagram p-3 text-gray-700 hover:text-black"></i>
          </div>

        </div>
      </div>
    </div>
  );
}
