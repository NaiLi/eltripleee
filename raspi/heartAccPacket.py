from datetime import datetime
import urllib2
import json

class HeartAccPacket:
    def __init__(self, endPoint):
        self.beats = None
        self.accData = None
        self.endPoint = endPoint

    def sendPacket(self):
        req = urllib2.Request(self.endPoint+"pulse")
        req.add_header('Content-Type', 'application/json')
        payload = self.beats.toJSON()
        print payload
        urllib2.urlopen(req, (payload))

       # req = urllib2.Request(self.endPoint+"acc")
       # req.add_header('Content-Type', 'application/json')
       # payload = self.beats.toJSON()
       # print payload
       # urllib2.urlopen(req, (payload))

        self.clear()

    def clear(self):
        self.beats.beats = []
        self.accData.data = []

class HeartBeatData:
    def __init__(self):
        self.startTime = None
        self.endTime = None
        self.beats = []

    def addBeat(self):
        self.beats.append(int(datetime.now().strftime('%s')))

    def startMeasurement(self):
        self.startTime = int(datetime.now().strftime('%s'))

    def finishMeasurement(self):
        self.endTime = int( datetime.now().strftime('%s'))

    def toJSON(self):
        return json.dumps(self.__dict__)


class AcceleratorData:
    def __init__(self):
        self.data = []
        self.startTime = None
        self.endTime = None
        self.peak = None

    def startMeasurement(self):
        self.startTime = int(datetime.now().strftime('%s'))

    def finishMeasurement(self):
        self.endTime = int( datetime.now().strftime('%s'))
        self.getPeak()

    def addAccData(self, x, y, z):
        self.data.append(x)
        self.data.append(y)
        self.data.append(z)

    def getPeak(self):
        self.peak = max(self.data)

    def toJSON(self):
        return json.dumps(self.__dict__)

