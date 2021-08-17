export interface Command {
    execute():string
}

export class Light {
    public HIGH:number = 3;
    public MEDIUM:number = 2;
    public LOW:number = 1;
    public OFF:number = 0;


    isRedLightOn:boolean;
    isLightOn:boolean;
    luminosity:number;

    constructor(){
        this.luminosity = this.OFF
        this.isRedLightOn = false
        this.isLightOn = false
    }

    public on(){
        this.isLightOn = true;
        this.isRedLightOn = false;
        return "on";
    }
    public off(){
        this.isLightOn = false;
        this.isRedLightOn = false;
        return "off"
    }
    public redOFF(){
        this.luminosity=this.OFF;
        return 'red0';
    }
    public redLOW(){
        this.luminosity=this.LOW;
        this.isRedLightOn = true;
        return "red1"
    }
    public redMEDIUM(){
        this.luminosity=this.MEDIUM;
        return "red2"
    }
    public redHIGH(){
        this.luminosity=this.HIGH;
        return "red3"
    }
    public  getLuminosity(){
        return this.luminosity;
    }
    public getRedLightStatus(){
        return this.isRedLightOn;
    }
    public getLightOnStatus(){
        return this.isLightOn;
    }
}

export class LightOnCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.on()
    }
}

export class LightOffCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.off()
    }
}

export class RedLightIncrease implements Command {
    light:Light;
    prevLuminosity:number;
    isRedLightOn:boolean;
    isLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.isRedLightOn=light.getRedLightStatus();
        this.isLightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.isLightOn){
            return this.light.on()
        }
        else if(!this.isRedLightOn){
            return this.light.on();
        }
        else if(this.prevLuminosity === this.light.HIGH){
           return this.light.redHIGH()
        }
        else if(this.prevLuminosity === this.light.MEDIUM){
           return this.light.redHIGH();
        }
        else if(this.prevLuminosity === this.light.LOW){
           return this.light.redMEDIUM();
        }
        else if(this.prevLuminosity === this.light.OFF){
           return this.light.redLOW();
        }
        else{
            return 'increased max'
        }
    }
}

export class RedLightDecrease implements Command {
    light:Light;
    prevLuminosity:number;
    isRedLightOn:boolean;
    isLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.isRedLightOn=light.getRedLightStatus();
        this.isLightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.isLightOn){
            return this.light.on()
        }
        else if(!this.isRedLightOn){
            return this.light.on();
        }
        else if(this.prevLuminosity === this.light.HIGH){
           return this.light.redMEDIUM()
        }
        else if(this.prevLuminosity === this.light.MEDIUM){
           return this.light.redLOW();
        }
        else if(this.prevLuminosity === this.light.LOW){
           return this.light.redOFF();
        }
        else if(this.prevLuminosity === this.light.OFF){
           return this.light.redOFF();
        }
        else{
            return 'Decreased min'
        }
    }
}

export class RedLightOn implements Command {
    light:Light;
    prevLuminosity:number;
    isLightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.isLightOn=light.getLightOnStatus()
    }
    execute():string{
        if(this.isLightOn){
            return this.light.redLOW();
        }else{
            return this.light.off();
        }
    }
}

export class RemoteControl{
    command!:Command

    setCommand(command:Command){
        this.command = command
    }

    buttonWasPressed(){
       return this.command.execute()
    }
}
