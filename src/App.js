import React, { useEffect, useRef, useState } from 'react';
import { Buffer, Player, Transport } from 'tone';
import * as Tone from 'tone';

import './App.css';

function App() {

  const players = useRef([]);

  const [load, setLoad] = useState(false);
  const [position, setPosition] = useState('0:0:0');
  const [bpm, setBpm] = useState(80);
  const [file, setFile] = useState('http://localhost:3000/lessons/88-michael-row-the-boat/mp3-80-bpm/0-4.mp3');

  const audioBuffers = {};

  useEffect(() => {
    console.log("useEffect()");

    const audioFiles = ['http://localhost:3000/lessons/op-maat-gemaakt/mp3-80-bpm/click.mp3',
      'http://localhost:3000/lessons/88-michael-row-the-boat/mp3-80-bpm/0-4.mp3',
      'http://localhost:3000/lessons/88-michael-row-the-boat/mp3-116-bpm/0-2.mp3'];

    const fileCount = audioFiles.length;
    let errors;


    audioFiles.forEach(audioFile => {
      // console.log(audioFile);
      var buffer = new Buffer(audioFile,
        function onload() {

          console.log(audioFile + ' loaded');
          audioBuffers[audioFile] = buffer.get();

          // console.log('AUDIO BUFFER lenght : ', Object.keys(audioBuffers).length);
          // console.log('fileCOUNT ', fileCount);

          if (!errors && Object.keys(audioBuffers).length === fileCount) {
            console.log('%c All buffers loaded!', 'color:green');
            //resolve(audioBuffers);

            init(audioBuffers, file, bpm);

            // players.current[2] = new Player({
            //   'url': audioBuffers['http://localhost:3000/lessons/88-michael-row-the-boat/mp3-116-bpm/0-2.mp3']
            // }).toDestination().sync().start('4m');

            // Transport.schedule((time) => {
            //   Transport.bpm.value = 116;
            // }, '4:1:0');
            // Transport.schedule((time) => {
            //   Transport.bpm.value = 80;
            // }, '0:1:0');

            // Transport.position = position;
            //Transport.start();
          }

        }, function onerror() {
          errors = true;
          console.log('Error loading audio buffer ' + audioFile);
        });

    });

    // return () => {

    // }
  }, []);

  const init = (audioBuffers, file, bpm) => {
    console.log("init()");
    //// add click sound to the player.
    players.current[1] = new Player({
      url: audioBuffers['http://localhost:3000/lessons/op-maat-gemaakt/mp3-80-bpm/click.mp3'],
    }).toDestination();

    Transport.bpm.value = bpm;
    Transport.scheduleRepeat(function (time) {
      players.current[1].start(time);
    }, '4n'); // '1m'

    players.current[0] = new Player({
      'url': audioBuffers[file]
    }).toDestination().sync().start();
  }

  const reset = () => {
    Transport.stop();
    Transport.cancel();
    players.current[0].dispose();
    players.current[1].dispose();
    // players.current[2].dispose();

    //setLoad(!load);
  }

  return (

    <div>
      {console.log("render jsx")}
      <button onClick={() => {
        // reset();

        // Transport.bpm.value = 80;
        // Transport.position = '0:0:0'
        // Transport.start();
        //reset();
        // setBpm(80);
        //setFile('http://localhost:3000/lessons/88-michael-row-the-boat/mp3-80-bpm/0-4.mp3');
        reset();
        init(audioBuffers, 'http://localhost:3000/lessons/88-michael-row-the-boat/mp3-80-bpm/0-4.mp3', 80);
        Transport.start();
        // setPosition('0:0:0');

        // setLoad(!load);
      }} >Transport.posistion('0:0:0')</button>
      <button onClick={() => {
        //  reset();

        // Transport.bpm.value = 116;
        // Transport.position = '4:0:0'
        // Transport.start();
        // setBpm(116);
        reset();
        init(audioBuffers, 'http://localhost:3000/lessons/88-michael-row-the-boat/mp3-116-bpm/0-2.mp3', 116);
        Transport.start();

        // setPosition('4:0:0');
      }} >Transport.posistion('4:0:0')</button>
      <button onClick={() => Transport.start()} >Transport play()</button>
      <button onClick={() => Transport.pause()} >Transport pause()</button>
      <button onClick={() => Transport.stop()} >Transport stop()</button>
      <button onClick={() => Transport.clear()} >Transport clear()</button>
      <button onClick={() => Transport.cancel()} >Transport cancel()</button>
      <button onClick={() => Transport.dispose()} >Transport dispose()</button>
      <button onClick={() => console.log(Transport.get())} >Transport get()</button>
      <button onClick={() => {
        Transport.bpm.value = 80;
      }} >bpm 80</button>
      <button onClick={() => {
        Transport.bpm.value = 120;
      }} >bpm 120</button>
      <br />
      <br />
      <button onClick={() => players.current[0].start()} >Player start()</button>
      <button onClick={() => players.current[0].stop()} >Player stop()</button>
      <button onClick={() => players.current[0].dispose()} >Player dispose()</button>
      <button onClick={() => players.current[0].reverse = true} >Player reverse</button>
      <br />
      <br />
      <button onClick={() => {
        reset();
      }} >reload</button>


    </div>
  );
}

export default App;
