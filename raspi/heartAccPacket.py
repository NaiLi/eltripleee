from datetime import datetime
import urllib2
import json

class HeartAccPacket:
    def __init__(self, endPoint):
        self.beats = None
        self.AccData = None
        self.endPoint = endPoint

    def sendPacket(self):
        req = urllib2.Request(self.endPoint)
        req.add_header('Content-Type', 'application/json')
        payload = self.toJSON()
        print payload
        urllib2.urlopen(req, (payload))
        self.clear()

    def toJSON(self):
        return self.beats.toJSON()

    def clear(self):
        self.beats = None
        self.AccData = None

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
    def __init__(self, sampleRate):
        self.data = []
        self.sampleRate = sampleRate

    def addAccData(self, x, y, z):
        self.data.append(x)
        self.data.append(y)
        self.data.append(z)

