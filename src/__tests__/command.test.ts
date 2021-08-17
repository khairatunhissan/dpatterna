import { Light, LightOnCommand,LightOffCommand, RedLightOn, RedLightDecrease, RedLightIncrease } from "../patterns/command/command-remote";

describe('Command pattern test', () => {
    test('red light increased', () => {
        let light = new Light();
        light.isLightOn = true;
        light.isRedLightOn=true;
        light.luminosity=1;
        let reality = new RedLightIncrease(light);
        expect(light.redMEDIUM()).toEqual(reality.execute());
    })
    test('red light decreased', () => {
        let light = new Light();
        light.isLightOn = true;
        light.isRedLightOn=true;
        light.luminosity=1;
        let reality = new RedLightDecrease (light);
        expect(light.redOFF()).toEqual(reality.execute());
    })
    test('red light on', () => {
        let light = new Light();
        light.isLightOn = true;
        let reality = new RedLightOn(light);
        expect(light.redLOW()).toEqual(reality.execute());
    })
    test('light on', () => {
        let light = new Light();
        light.isLightOn = true;
        let reality = new LightOnCommand(light);
        expect(light.on()).toEqual(reality.execute());
    })
    test('light off', () => {
        let light = new Light();
        let reality = new LightOffCommand(light);
        expect(light.off()).toEqual(reality.execute());
    })
})