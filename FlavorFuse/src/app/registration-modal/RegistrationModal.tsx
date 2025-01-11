"use client";

import { useState } from "react";

type RegistrationModalProps = {
  onClose: () => void; 
  onRegister: (name: string) => void;

};


const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onRegister,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePassword = (password: string, confirmPassword: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!password.match(passwordRegex)) {
      setError("Lozinka mora sadržavati: barem jedno veliko slovo, jedno malo slovo, broj i specijalni znak.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Lozinke se ne poklapaju.");
      return false;
    }

    setError("");
    return true;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(formData.password, formData.confirmPassword)) {
      onRegister(formData.name); // Pošaljemo ime roditeljskoj komponenti
      onClose(); // Zatvaramo modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center font-italianno text-[#b2823b] mb-6">
          REGISTRACIJA
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ime */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Ime i prezime
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#b2823b] focus:border-[#b2823b]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#b2823b] focus:border-[#b2823b] "
              required
            />
          </div>

          {/* Lozinka */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#b2823b] focus:border-[#b2823b]"
              required
            />
          </div>

          {/* Potvrda lozinke */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Potvrda lozinke
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#b2823b] focus:border-[#b2823b]"
              required
            />
          </div>

          {/* Obavijest o grešci */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Gumb za potvrdu */}
          <button
            type="submit"
            className="px-5 py-1 text-lg bg-[#fde4b5] text-gray-900 border-2 border-[#b2823b] rounded-full hover:scale-105 transition-transform duration-300"
          >
            Potvrdi
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-1 text-lg bg-gray-300 text-gray-700 border-2 border-gray-700 rounded-full hover:scale-105 transition-transform duration-300"
        >
          Odustani
        </button>
      </div>
    </div>
  );
}

export default RegistrationModal;
