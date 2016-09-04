#!/user/bin/env python
import time
import os
import RPi.GPIO as IO
from datetime import datetime
import heartAccPacket as ham

DEBUG = 1

#Use GPIO numbering
IO.setmode(IO.BCM)
IO.setwarnings(False)

# Clock
SPICLK = 18
# digital in
SPIMISO = 23
# digital out
SPIMOSI = 24
#Chip sekect
SPICS = 25

#heart rate
HR = 17
#LED pulse
LED = 22

#IO pins ADC
IO.setup(SPIMOSI, IO.OUT)
IO.setup(SPIMISO, IO.IN)
IO.setup(SPICLK, IO.OUT)
IO.setup(SPICS, IO.OUT)

#IO pins Heart rate
IO.setup(HR, IO.IN)
IO.setup(LED, IO.OUT)
IO.output(LED, IO.HIGH)

#ADC channels
accX = 0
accY = 1
accZ = 2

"""
    Read data from ADC
"""
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
    if((adcnum > 7) or (adcnum < 0)):
        return -1

    IO.output(cspin, True)

    IO.output(clockpin, False)
    IO.output(cspin, False)

    commandout = adcnum
    commandout |= 0x18
    commandout <<= 3

    for i in range(5):
        if (commandout & 0x80):
            IO.output(mosipin, True)
        else:
            IO.output(mosipin, False)
        commandout <<= 1
        IO.output(clockpin, True)
        IO.output(clockpin, False)

    adcout = 0

    for i in range(12):
        IO.output(clockpin, True)
        IO.output(clockpin, False)
        adcout <<= 1
        if (IO.input(misopin)):
            adcout |= 0x1

    IO.output(cspin, True)

    adcout >>= 1
    return adcout

#Heart rate sampling
heartSample = 2
oldHeartSample = 1

#measure heartrate during 10 seconds
heartInterval = 5
start = datetime.now()
current = start

dataPacket = ham.HeartAccPacket("http://10.0.0.220:3000/")
heartBeat = ham.HeartBeatData()
accData = ham.AcceleratorData()

heartBeat.startMeasurement()
accData.startMeasurement()
while True:
    #get Accelerometer data
    dataX = readadc(accX, SPICLK, SPIMOSI, SPIMISO, SPICS)
    dataY = readadc(accY, SPICLK, SPIMOSI, SPIMISO, SPICS)
    dataZ = readadc(accZ, SPICLK, SPIMOSI, SPIMISO, SPICS)
    accData.addAccData(dataX, dataY, dataZ)
    #print debug data
    if DEBUG:
        if dataX > 800 or dataY > 800 or dataZ > 800:
            print "ERIK FALLER!!!!"
            print "X: ", dataX, " Y: ", dataY, " Z: ", dataZ


    heartSample = IO.input(HR)

    if heartSample == 1 and oldHeartSample == 0:
        if DEBUG:
            print "Beat"
        IO.output(LED, IO.LOW)
        heartBeat.addBeat()

    if heartSample == 0 and oldHeartSample == 1:
        IO.output(LED, IO.HIGH)

    oldHeartSample = heartSample

    current = datetime.now()
    measurement = current-start


    if (measurement.seconds*1e6 + measurement.microseconds) >= heartInterval*1e6:

        heartBeat.finishMeasurement()
        accData.finishMeasurement()
        dataPacket.beats = heartBeat
        dataPacket.accData = accData
        dataPacket.sendPacket()
        print "sending packet"
        start = current
        heartBeat.startMeasurement()
        accData.startMeasurement()

