import React from 'react'

type Props = {
    onSongSelected: () => void
    onSongAdded: () => void
    onSongDeleted: () => void
}

class Queue {
    private queue
    constructor() {
        this.queue = []
    }

    getQueue = () => {
      return [...this.queue]
    }

    enqueue = (id) => {
        this.queue.push(id)
    }

    dequeue = () => {
        let element = this.queue.shift()
        return element
    }

    length = () => this.queue.length
}
const q = new Queue()

const MusicQueue = ({ onSongSelected, onSongAdded, onSongDeleted }: Props) => {
    const musicList = q.getQueue().map(id => {
        
    })

    return <div>MusicQueue
      
    </div>
}

export default MusicQueue
