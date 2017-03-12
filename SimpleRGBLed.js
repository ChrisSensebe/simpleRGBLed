/**
 * Created by christophesensebe on 12/03/2017.
 */
const five = require('johnny-five');

class SimpleRGBLed {

    /**
     * wraps johnny-five (http://johnny-five.io/api/led.rgb/) Led.RGB
     * with Promise based api
     * @param ledPins, numbers { red , green, blue }
     */
    constructor(ledPins){
        let board = new five.Board();
        // promise of board
        this.board = new Promise((resolve, reject) => {
            board.on('ready', (err) => {
            if(err){
                return reject(err);
            }
            this.led = new five.Led.RGB({pins : ledPins});
            return resolve();
            });
        });
    }

    /**
     * turn the led on with previous color value
     * @returns {Promise}
     */
    turnOn(){
        return this.board.then(() => {
            this.led.on();
        });
    }

    /**
     * turn the led off
     * @returns {Promise}
     */
    turnOff(){
        return this.board.then(() => {
            this.led.off();
        });
    }

    /**
     * toggle the current state (on/off)
     * @returns {Promise}
     */
    toggle(){
        return this.board.then(() => {
            this.led.toggle();
        });
    }

    /**
     * blink the led, every interval
     * @param interval, in ms
     * @returns {Promise}
     */
    blink(interval){
        return this.board.then(() => {
            this.led.blink(interval);
        });
    }

    /**
     * stop the led blinking
     * @returns {Promise}
     */
    stopBlink(){
        return this.board.then(() => {
            this.led.stop();
        });
    }

    /**
     * set led color
     * @param color, {red, green, blue}, numbers (0 - 255)
     * @returns {Promise}
     */
    setColor(color = {red: 255, green: 255, blue: 255}){
        return this.board.then(() => {
            this.led.color(color);
        });
    }

    /**
     * return promise of led color
     * @returns {Promise}
     */
    getColor(){
        return this.board.then(() => {
            return this.led.color();
        });
    }

    /**
     * change led intensity, keeping color
     * @param value, led intensity percentage, 0-100
     * @returns {Promise}
     */
    setIntensity(value){
        return this.board.then(() => {
            return this.led.intensity(value);
        });
    }
}

module.exports = SimpleRGBLed;