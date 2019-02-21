function EventEmitter() {
    this.events = {} //存储所有事件的listener
    this._maxListeners = 10
}

EventEmitter.prototype.setMaxListeners = function (num) {
    this._maxListeners = num
}

EventEmitter.prototype.listeners = function (event) {
    return this.events[event]
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (event, listener) {
    if (this.events[event]) {
        this.events[event].push(listener)
    } else {
        this.events[event] = []
        this.events[event].push(listener)
    }
}

EventEmitter.prototype.emit = function (event, ...rest) {
    if (this.events[event]) {
        if (this.events[event].length >= this._maxListeners) {
            console.error('beyond climax')
        } else {
            this.events[event].forEach(listener => {
                listener.apply(this, rest)
            })
        }
        ;
    }
}

EventEmitter.prototype.once = function (event, listener) {
    let wrapper = (...rest) => {
        listener.apply(this, rest)
        console.assert(this != global, 'this指向错误')
        this.removeListener(event, wrapper)
    }
    this.on(event, wrapper)
}

EventEmitter.prototype.removeListener = function (event, listener) {
    if (this.events[event]) {
        this.events[event] = this.events[event].filter(value => value != listener)

    }
}

EventEmitter.prototype.removeAllListener = function (event) {
    delete this.events[event]
}
module.exports = EventEmitter