let database = require('./database');
let binarySearch = require('binary-search');

const pulseOutdatedThreshold = 5000; // ms.
const inputGapThreshold = 1000; // ms
const minSamples = 2;
const maxSamples = 5;

class Pulse {
  getPulseAtTime(patientId, time) {
    let pulseData = database.getPulseData(patientId);
    let chunkIndex = binarySearch(pulseData, {endTime: time}, function (a, b) {
      return a.endTime - b.endTime;
    });

    if (chunkIndex < 0) {
      chunkIndex = -(chunkIndex + 1) - 1;
    }
    //console.log('looking in ', chunkIndex, ', n pulse data = ', pulseData.length);

    let currentItemInChunk = pulseData[chunkIndex].beats.length - 1;
    if (pulseData[chunkIndex].beats[currentItemInChunk] < time - pulseOutdatedThreshold) return null;

    let nSamples = 0;
    let lastTime = pulseData[chunkIndex].beats[currentItemInChunk];
    let firstTime = lastTime;

    for (nSamples = 0; nSamples < maxSamples; nSamples++) {
      firstTime = pulseData[chunkIndex].beats[currentItemInChunk];
      //console.log(chunkIndex, currentItemInChunk, firstTime);

      currentItemInChunk--;
      // Wrap to previous chunk.
      if (currentItemInChunk < 0) {
        chunkIndex--;
        if (chunkIndex < 0) {
          // abort if no more data.
          break;
        }
        if (pulseData[chunkIndex + 1].startTime - pulseData[chunkIndex].endTime > inputGapThreshold) {
          // abort if gap between chunks is to long.
          break;
        }
        currentItemInChunk = pulseData[chunkIndex].beats.length - 1;
      }
      
    }

    if (nSamples < minSamples) {
      return null;
    }

    let averageTime = (lastTime - firstTime) / (nSamples - 1) ;
    let averagePulse = 60 * 1000 / averageTime;
    return averagePulse;
  }
}

/*
Vi sitter i samma fil
Vi sitter i samma fil
Indentera i min stil!
Vi sitter i samma fil
Om jag gör en till commit
får du inte pusha ditt
Appen är så instabil
Vi sitter i samma fil
*/




module.exports = new Pulse();