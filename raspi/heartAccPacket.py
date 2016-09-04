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
        try:
            urllib2.urlopen(req, (payload))
        except:
            print 'error'

        req = urllib2.Request(self.endPoint+"movement")
        req.add_header('Content-Type', 'application/json')
        payload = self.accData.toJSON()
        print payload
        try:
            urllib2.urlopen(req, (payload))
        except:
            print 'error'

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
        self.beats.append(int(datetime.now().strftime('%s'))*1000)

    def startMeasurement(self):
        self.startTime = int(datetime.now().strftime('%s'))*1000

    def finishMeasurement(self):
        self.endTime = int( datetime.now().strftime('%s'))*1000
        self.time = self.endTime

    def toJSON(self):
        return json.dumps(self.__dict__)


class AcceleratorData:
    def __init__(self):
        self.data = []
        self.startTime = None
        self.endTime = None
        self.movement = None
        self.time = None

    def startMeasurement(self):
        self.startTime = int(datetime.now().strftime('%s'))*1000

    def finishMeasurement(self):
        self.endTime = int( datetime.now().strftime('%s'))*1000
        self.time = self.endTime
        self.getPeak()
        self.data = []

    def addAccData(self, x, y, z):
        self.data.append(x)
        self.data.append(y)
        self.data.append(z)

    def getPeak(self):
        if len(self.data) > 0:
            largest = max(self.data)
            smallest = 1024-min(self.data)
            self.movement = max(largest, smallest)
        else:
            self.movement = 512


    def toJSON(self):
        return json.dumps(self.__dict__)

