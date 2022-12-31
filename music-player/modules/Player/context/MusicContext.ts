import React from 'react'
import Music from '../types/Music'

export const music: Music[] = [
    {
        artist: 'Quincy The Engineer',
        duration: 190,
        title: 'Relax Life is Good',
        album: 'Its All Good',
        genre: 'chill',
        vibe: ['chill', 'relaxing', 'hip-hop'],
        published_date: '1672186610316',
        artwork: '/favicon.ico',
    },
    {
      artist: 'Watch The Throne',
      duration: 190,
      title: 'Otis',
      album: 'Watch The Throne',
      genre: 'hip-hop',
      vibe: ['hip-hop'],
      published_date: '1672186610316',
      artwork: '/favicon.ico',
  }
]

export const MusicContext = React.createContext(
    music // default value
)
