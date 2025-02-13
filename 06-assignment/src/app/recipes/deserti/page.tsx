"use client";

import { useState, useEffect } from 'react';
import { createClient, Entry, Asset } from 'contentful';
import Image from 'next/image';


const client = createClient({
  space: 'ocm9154cjmz1',
  accessToken: 'r7B6-Fb1TqITT79XXiA3igrdqBEtOwlHiS2hazq2T6o'
});

type Recept = {
  contentTypeId: string;
  sys: {
    id: string;
  };
  fields: {
    nazivRecepta: string;
    sastojci: string;
    uputeZaPripremu: string;
    opisRecepta?: string;
    kategorija?: string[];
    slikaRecepta?: Asset;
  };
};

const mapEntryToRecept = (entry: Entry<Recept>): Recept => {
  const nazivRecepta = typeof entry.fields.nazivRecepta === 'string' ? entry.fields.nazivRecepta : 'Nepoznato ime';
  const sastojci = typeof entry.fields.sastojci === 'string' ? entry.fields.sastojci : 'Nepoznati sastojci';
  const uputeZaPripremu = typeof entry.fields.uputeZaPripremu === 'string' ? entry.fields.uputeZaPripremu : 'Nema uputa';
  const opisRecepta = typeof entry.fields.opisRecepta === 'string' ? entry.fields.opisRecepta : '';
  const kategorija = Array.isArray(entry.fields.kategorija)
    ? entry.fields.kategorija.map((kat) => (typeof kat === 'string' ? kat : kat.fields.nazivKategorije))
    : [];
  
  const slikaRecepta = entry.fields.slikaRecepta && entry.fields.slikaRecepta.sys && entry.fields.slikaRecepta.fields 
    ? {
        sys: entry.fields.slikaRecepta.sys,
        fields: entry.fields.slikaRecepta.fields,
        metadata: entry.fields.slikaRecepta.metadata,
      }
    : undefined;

  return {
    contentTypeId: entry.sys.contentType.sys.id,
    sys: {
      id: entry.sys.id,
    },
    fields: {
      nazivRecepta,
      sastojci,
      uputeZaPripremu,
      opisRecepta,
      kategorija,
      slikaRecepta,
    },
  };
};

const DesertiPage = () => {
  const [recipes, setRecipes] = useState<Recept[]>([]);

  useEffect(() => {
    client.getEntries({ content_type: 'recept' })
      .then((response) => {
        const healthyRecipes = response.items
        .filter((item) => Array.isArray(item.fields.kategorija) && item.fields.kategorija.some((kat) => kat === 'Deserti'))
        .map(mapEntryToRecept);

        setRecipes(healthyRecipes);
      })
      .catch((error) => {
        console.error('Error fetching content from Contentful', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Deserti</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.sys.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.fields.nazivRecepta}</h2>

            {recipe.fields.opisRecepta && (
              <p className="text-gray-700 mb-4">{recipe.fields.opisRecepta}</p>
            )}

            {recipe.fields.kategorija && recipe.fields.kategorija.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                Kategorija: {recipe.fields.kategorija.join(", ")}
              </p>
            )}

            {recipe.fields.slikaRecepta && (
              <Image
                src={typeof recipe.fields.slikaRecepta.fields.file.url === 'string' ? recipe.fields.slikaRecepta.fields.file.url : ''}
                alt={recipe.fields.nazivRecepta}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

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

export default DesertiPage;