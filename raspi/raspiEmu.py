import heartAccPacket as ham
import time

endpoint = "http://localhost:3000/pulse"
beats = 10

packet = ham.HeartAccPacket(endpoint)
heartBeat = ham.HeartBeatData()

heartBeat.startMeasurement()
for i in range(beats):
    time.sleep(0.1)
    heartBeat.addBeat()

heartBeat.finishMeasurement()
packet.beats = heartBeat
packet.sendPacket()

