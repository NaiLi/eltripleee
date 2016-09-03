#!/user/bin/env python
import time
import os
import RPi.GPIO as IO
from datetime import datetime

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

    adcout = 0.0

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
oldhHeartSample = 1

#measure heartrate during 10 seconds
interval = 10
start = datetime.now()
current = start

heartBeatCounter = 0

while True:

    #get Accelerometer data
    dataX = readadc(accX, SPICLK, SPIMOSI, SPIMISO, SPICS);
    dataY = readadc(accY, SPICLK, SPIMOSI, SPIMISO, SPICS);
    dataZ = readadc(accZ, SPICLK, SPIMOSI, SPIMISO, SPICS);
    #print debug data
    if DEBUG:
        print "X: ", dataX, " Y: ", dataY, " Z: ", dataZ


    heartSample = IO.input(HR)

    if heartSample == 1 and oldHeartSample == 0:
        heartBeatCounter += 1
        if DEBUG:
            print "Beat"
        IO.output(LED, IO.LOW)

    if heartSample == 0 and oldHeartSample == 1:
        if DEBUG:
            print "Beat off"
        IO.output(LED, IO.HIGH)

    oldHeartSample = heartSample

    current = datetime.now()
    measurement = current-start


    if (measurement.seconds*1e6 + measurement.microseconds) >= interval*1e6:

        multiplier =  60*1e6/(measurement.seconds*1e6+measurement.microseconds)
        print beatCounter*multiplier
        start = current
        beatCounter = 0

