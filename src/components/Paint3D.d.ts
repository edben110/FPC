import React from 'react';

export interface Stroke {
  points: number[][];
  color: string;
  width: number;
}

export interface SavedWork {
  id: number;
  name: string;
  strokes: Stroke[];
  date: string;
  thumbnail: string;
}

declare const Paint3D: React.FC;
export default Paint3D;
