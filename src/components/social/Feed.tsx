// 🚀 HUBBAX FEED - ESTÉRIL / MODO RESCATE
// Este archivo ha sido simplificado al máximo para eliminar el "Cuadro Negro"
// Si esto carga, el problema está en los componentes hijos (Stories, CreatePost) o Firebase.

import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';

interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  content: string;
  timestamp: string;
  likes: string[];
  comments: any[];
  shares: string[];
}

const POSTS_SISTEMA = [
  {
    id: "res-1",
    authorName: "SISTEMA HUBBAX",
    authorUsername: "system",
    content: "🚨 MODO RESCATE ACTIVADO. Si puedes leer esto, la infraestructura básica del Feed funciona. Estamos eliminando el 'Cuadro Negro' pieza por pieza.",
    timestamp: "Ahora",
    likes: [],
    comments: [],
    shares: [],
  },
  {
    id: "res-2",
    authorName: "SISTEMA HUBBAX",
    authorUsername: "system",
    content: "Análisis: El cuadro negro suele ser un crash en la fase de renderizado. Estamos aislando los componentes sospechosos.",
    timestamp: "Ahora",
    likes: [],
    comments: [],
    shares: [],
  }
];

export function Feed() {
  return (
    <div className="w-full max-w-[680px] mx-auto py-8 px-4 bg-transparent min-h-screen">
      <div className="mb-8 p-6 bg-red-500/20 border border-red-500/40 rounded-3xl text-center">
        <h2 className="text-white font-black text-xl mb-2">DIAGNÓSTICO DE SISTEMA</h2>
        <p className="text-red-200 text-sm">Renderizando versión estéril para detectar el origen del crash.</p>
      </div>
      
      <div className="space-y-6">
        {POSTS_SISTEMA.map((post) => (
          <PostCard {...post} />
        ))}
      </div>
    </div>
  );
}
