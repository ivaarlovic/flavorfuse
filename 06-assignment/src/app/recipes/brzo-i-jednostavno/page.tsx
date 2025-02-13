"use client";

import { useState, useEffect } from 'react';
import { createClient, Entry } from 'contentful';

const client = createClient({
  space: 'ocm9154cjmz1',
  accessToken: 'r7B6-Fb1TqITT79XXiA3igrdqBEtOwlHiS2hazq2T6o',
});

type Recept = {
  sys: {
    id: string;
  };
  fields: {
    nazivRecepta: string;
    sastojci: string;
    uputeZaPripremu: string;
    opisRecepta?: string;
    kategorija?: string[];
    slikaRecepta?: {
      fields: {
        file: {
          url: string | undefined;
        };
      };
    };
  };
};

const mapEntryToRecept = (entry: Entry<any>): Recept => ({
  sys: {
    id: entry.sys.id,
  },
  fields: {
    nazivRecepta: typeof entry.fields.nazivRecepta === 'string' ? entry.fields.nazivRecepta : '',
    sastojci: typeof entry.fields.sastojci === 'string' ? entry.fields.sastojci : '',
    uputeZaPripremu: typeof entry.fields.uputeZaPripremu === 'string' ? entry.fields.uputeZaPripremu : '',
    opisRecepta: typeof entry.fields.opisRecepta === 'string' ? entry.fields.opisRecepta : '',
    kategorija: entry.fields.kategorija
      ? Array.isArray(entry.fields.kategorija)
        ? entry.fields.kategorija.map((kat: any) => kat.fields.nazivKategorije)
        : [entry.fields.kategorija.fields.nazivKategorije]
      : [],
    slikaRecepta: entry.fields.slikaRecepta ? {
      fields: {
        file: {
          url: entry.fields.slikaRecepta.fields.file.url,
        },
      },
    } : undefined,
  },
});

const BrzoIJednostavnoPage = () => {
  const [recipes, setRecipes] = useState<Recept[]>([]);

  useEffect(() => {
    client.getEntries({ content_type: 'recept' })
      .then((response) => {
        // Filtriranje za 'Zdravi Recepti' kategoriju
        const healthyRecipes = response.items
          .filter((item: any) => item.fields.kategorija?.some((kat: any) => kat.fields.nazivKategorije === 'Brzo i jednostavno'))
          .map(mapEntryToRecept);

        setRecipes(healthyRecipes);
      })
      .catch((error) => {
        console.error('Error fetching content from Contentful', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Brzo i jednostavno</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.sys.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.fields.nazivRecepta}</h2>
            {recipe.fields.slikaRecepta && (
              <img
                src={recipe.fields.slikaRecepta.fields.file.url}
                alt={recipe.fields.nazivRecepta}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-semibold">Opis:</h3>
            <p className="text-gray-700 mb-2">{recipe.fields.opisRecepta}</p>
            <h3 className="font-semibold">Sastojci:</h3>
            <p className="text-gray-700">{recipe.fields.sastojci}</p>
            <h3 className="font-semibold mt-2">Priprema:</h3>
            <p className="text-gray-700">{recipe.fields.uputeZaPripremu}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrzoIJednostavnoPage;
