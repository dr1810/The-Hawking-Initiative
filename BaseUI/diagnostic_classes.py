class WeightedSum:
    def __init__(self,*args):
        self.weights = [i for i in args]
    def final_score(self,*args):
        if len(args) > len(self.weights):
            return False
        else:
            final_sum = 0
            weight = self.weights
            for i in range(len(args)):
                final_sum += weight[i]*args[i]
            return final_sum       

class Vision(WeightedSum):
    def __init__(self,con,size,contrast,fatigue,recogn):
        super().__init__(0.25,0.25,0.10,0.15,0.25)
        self.confidence = con
        self.font_size = size
        self.text_contrast = contrast
        self.eye_fatigue = fatigue
        self.color = recogn
    def vision_score(self):
        return self.final_score(
            self.confidence,
            self.font_size,
            self.text_contrast,
            self.eye_fatigue,
            self.color
        )

class Hearing(WeightedSum):
    def __init__(self, detect,noise,express,auditory,comm):
        super().__init__(0.20,0.30,0.15,0.15,0.20)
        self.detection = detect
        self.noise_comp = noise
        self.expression = express
        self.auditory_comp = auditory
        self.communication = comm
    def hearing_score(self):
        return self.final_score(
            self.detection,
            self.noise_comp,
            self.expression,
            self.auditory_comp,
            self.communication
        )

