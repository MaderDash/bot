import { MessageEmbed, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import universalEmbed from '../index';
export default {
  ask: {
    embeds: [
      new MessageEmbed(universalEmbed)
        .setTitle('Dont ask to ask - Just ask!')
        .addFields({
          name: 'Describe what your code/hardware does and what you want it to do instead. Sharing is caring! Share your code, click the "codeblock" button below to learn how.',
          value:
            'Keep in mind: no one here is paid to help you, so the least you can do is to refine your question in a proper language.',
        }),
    ],
    components: [
        new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('codeblock')
            .setLabel('codeblock')
            .setStyle(ButtonStyle.Primary);
        );
    ],
  },
  avrdude: {
    embeds: [
      new MessageEmbed(universalEmbed)
        .setTitle('Solving AVRDUDE communication errors (Try these in order)')
        .addFields(
          {
            name: '1. Is your Serial monitor open?',
            value:
              'If it is, close it. this allows your IDE to upload sketches without conflicts with the Serial Monitor.',
          },
          {
            name: '2. Have you selected the right port in your IDE?',
            value:
              'You could have selected something that is **not** your Arduino. Change the port in the Arduino IDE by going into Tools -> Port.',
          },
          {
            name: '3. Have you selected the right board in your IDE?',
            value: 'You need to select the right board and model.',
          },
          {
            name: 'You need to select the right board and model.',
            value:
              'If it does, unplug and re-plug your board, then check for blinking LEDs. If only the Power LED or no LEDs light up ask for further assistance (not for all boards).',
          },
          {
            name: '5. Do you have a Nano or other Atmega 328p based board?',
            value:
              "If so, try using the old bootloader. In the Arduino IDE Go to Tools -> Processor and select 328p(old bootloader). If your board doesn't have an Atmega 328p, you can skip this step.",
          },
          {
            name: '6. Does your onboard LED blink when you press the reset button?',
            value:
              "Try pressing the reset button on your Arduino, if the onboard LED doesn't blink when you reset, you probably have a broken bootloader, you can check out [this tutorial](https://www.arduino.cc/en/Hacking/Bootloader?from=Tutorial.Bootloader) on how to burn the bootloader.",
          },
          {
            name: '7. Is anything connected to your Tx and Rx pins?',
            value: 'If there is, try removing everything connected to them.',
          },
          {
            name: "8. Is this a problem on your computer's side?",
            value:
              "This might be a problem on your computer's side, so try restarting your computer.",
          },
          {
            name: '9. Are you running Linux?',
            value:
              'If you are running Linux, try checking which groups you belong by using the `groups` command, then look at which group you need to be in with `ls -l /dev/ttyACM*`, `ls -l /dev/S*` or `ls -ls /dev/USB*` (replace the `*` with your port number), then use this command:- `sudo usermod -a -G <group> <username>` and add your user to the necessary groups.',
          },
          {
            name: '10. Are your drivers installed?',
            value:
              "Check your drivers, sometimes just reinstalling them works. If you are using a clone board, you might have the CH340 USB-Serial chip, which isn't supported by default. You can check by looking at your board and checking the SMD USB-Serial chip's name (not the big one). [Click here](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all) to learn how to install CH340 Drivers. If you have an FTDI chip, [This website](https://learn.sparkfun.com/tutorials/how-to-install-ftdi-drivers/all) will show you how to install their drivers. If you don't have either we recommend googling the USB-Serial chip that your board uses.",
          },
          {
            name: '11. Is your cable faulty or capable of sending data?',
            value:
              'Some USB cables arent capable of transferring data, and some may be faulty, so make sure to try a different one to see if it works!',
          },
          {
            name: '12. Is this a problem with your IDE?',
            value: "If you think that's the case, try reinstalling the IDE.",
          }
        ),
    ],
  },
  codeblock: {
    content: '```ino\n// Please right-click on this message (long-press on mobile)\n// then select "Copy Text."\n\n// After that, copy your code; then paste it in place of this comment\n```'
  },
};
