import React, { useEffect, useState } from 'react'
import useSound from 'use-sound' // for handling the sound
import ButtonBar from './ButtonBar'
import { music, MusicContext } from '../context/MusicContext'
import MusicQueue from './MusicQueue'

type Props = {}

const usePlayer = (songRoute = '/RelaxLifeisGood.m4a') => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(songRoute)
    const [play, { pause, duration, sound }] = useSound(currentSong)
    const [songTime, setSongTime] = useState({ min: '', sec: '' })

    const [currTime, setCurrTime] = useState({
        min: '',
        sec: '',
    }) // current position of the audio in minutes and seconds

    const [seconds, setSeconds] = useState() // current position of the audio in seconds

    useEffect(() => {
        const sec = duration ? duration / 1000 : 0
        const min = Math.floor(sec / 60)
        const secRemain = Math.floor(sec % 60)
        const time = {
            min: min,
            sec: secRemain,
        }
        setSongTime(time)
    }, [currentSong, currTime])

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([])) // setting the seconds state with the current state
                const min = Math.floor(sound.seek([]) / 60)
                const sec = Math.floor(sound.seek([]) % 60)
                setCurrTime({
                    min,
                    sec,
                })
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [sound])

    const playingButton = () => {
        if (isPlaying) {
            pause() // this will pause the audio
            setIsPlaying(false)
        } else {
            play() // this will play the audio
            setIsPlaying(true)
        }
    }

    const SongProgress = (
        <div>
            <div className='time'>
                <p>
                    {currTime.min < 10 ? `0${currTime.min}` : currTime.min}:
                    {currTime.sec < 10 ? `0${currTime.sec}` : currTime.sec}
                </p>
                <p>
                    {songTime.min < 10 ? `0${songTime.min}` : songTime.min}:
                    {songTime.sec < 10 ? `0${songTime.sec}` : songTime.sec}
                </p>
            </div>
            <input
                type='range'
                min='0'
                max={duration! / 1000}
                default='0'
                value={seconds}
                className='timeline'
                onChange={(e) => {
                    sound.seek([e.target.value])
                }}
            />
        </div>
    )
    return {
        playingButton,
        isPlaying,
        play,
        pause,
        setCurrentSong,
        duration,
        currTime,
        setCurrTime,
        SongProgress,
    }
}

const Player = (props: Props) => {
    const {
        playingButton,
        isPlaying,
        play,
        pause,
        setCurrentSong,
        SongProgress,
    } = usePlayer()

    const MusicContext = React.createContext()

    return (
        <MusicContext.Provider music={music}>
            {(music) => {
                return (
                    <div className='component'>
                        <h2>Playing Now</h2>
                        <img
                            className='musicCover'
                            src='https://picsum.photos/200/200'
                        />
                        <div>
                            <h3 className='title'>Otis</h3>
                            <p className='subTitle'>Jay-Z & Kanye West</p>
                        </div>
                        {SongProgress}
                        <ButtonBar
                            isPlaying={isPlaying}
                            playingButton={playingButton}
                        />
                        <div>{music}</div>
                    </div>
                )
            }}
        </MusicContext.Provider>
    )
}

export default Player
