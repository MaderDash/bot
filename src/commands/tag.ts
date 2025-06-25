import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { TextChannel, EmbedBuilder } from 'discord.js';
import { BOT_COMMANDS_CHANNEL_ID } from '../utils/config';
import tags from '../utils/tags';
import universalEmbed from '../index'


export class TagCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'tag',
      description: 'Send a tag ephemerally.',
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) => 
          option
            .setName('name')
            .setDescription('Tag to see')
            .setRequired(true)
            .addChoices(
              // Keep existing choices
              { name: 'ask', value: 'ask' },
              { name: 'avrdude', value: 'avrdude' },
              { name: 'codeblock', value: 'codeblock' },
              { name: 'debounce', value: 'debounce' },
              { name: 'espcomm', value: 'espcomm' },
              { name: 'hid', value: 'hid' },
              { name: 'language', value: 'language' },
              { name: 'levelShifter', value: 'levelShifter' },
              { name: 'libmissing', value: 'libmissing' },
              { name: 'ninevolt', value: 'ninevolt' },
              { name: 'power', value: 'power' },
              { name: 'pullup', value: 'pullup' },
              { name: 'wiki', value: 'wiki' }
            )
        )
        .addUserOption((option) =>
          option
            .setName('user')
            .setDescription('User to ping in the bot commands channel.')
            .setRequired(false)
        );
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const option = interaction.options.get('name');
    const tagName = option?.value as keyof typeof tags;
    const user = interaction.options.getUser('user');
    const tag = tags[tagName];

    const botCommandsChannel = await interaction.guild?.channels.fetch(BOT_COMMANDS_CHANNEL_ID);

    if (!botCommandsChannel || !(botCommandsChannel instanceof TextChannel)) {
      return interaction.reply({
        content: 'Bot commands channel not found or is not a text channel.',
        ephemeral: true,
      });
    }

    let messagePayload: any = {};

    if (typeof tag === 'object') {
      messagePayload = { ...tag };
      if (user) {
        messagePayload.content = `<@${user.id}>`;
      }
    } else {
      messagePayload.content = user ? `<@${user.id}> ${tag}` : tag;
    }

    await botCommandsChannel.send(messagePayload);

    if (user) {
      // Notify the user in the original channel (not ephemeral)
      return interaction.reply({
        content: `<@${user.id}>`,
        ephemeral: false,
        embeds: [
          new EmbedBuilder(universalEmbed)
          .setTitle("Tag Sent in <#${BOT_COMMANDS_CHANNEL_ID}>")
        ],
      });
    } else {
      // Ephemeral reply for normal tag
      return interaction.reply({
        content: ``,
        ephemeral: true,
        embeds: [
          new EmbedBuilder(universalEmbed)
          .setTitle("Tag Sent in <#${BOT_COMMANDS_CHANNEL_ID}>")
        ],
      });
    }
  }
}
