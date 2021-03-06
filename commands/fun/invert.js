const Command = require('../../structures/Command');
const {MessageAttachment} = require('discord.js');
/**
 * Class Invert extends Command (baseCommand)
 */
class Invert extends Command {
  /**
   * Constructor
   * @param {object} bot the Client instance
   */
  constructor(bot) {
    super(bot);
    this.cmd = 'invert';
    this.cat = 'fun';
    this.needGuild = true;
    this.help = {
      short: 'help.invert.short',
      usage: 'help.invert.usage',
      example: 'help.invert.example',
    };
  }

  /**
   * Execute the command
   * @param {object} msg the message object
   */
  async run(msg) {
    const msgSplit = msg.content
      .trim()
      .split(' ')
      .map(c => c.trim())
      .filter(c => c !== '')
      .splice(1)
      .join(' ');
    let usr;
    if (msgSplit.length === 0) {
      usr = this.bot.utils
        .findMember(msg.channel.guild, msg.author.id, this.bot)
        .first();
    } else if (msg.mentions.members.size > 0) {
      usr = msg.mentions.members.first();
    } else if (msgSplit) {
      usr = this.bot.utils.findMember(msg.channel.guild, msgSplit, this.bot);
      if (usr.size === 0)
        return msg.channel.send(`❌ Nobody found matching \`${msgSplit}\`!`);
      else if (usr.size === 1) usr = usr.first();
      else return msg.channel.send(this.bot.utils.formatMembers(this.bot, usr));
    }
    const imgBuffer = await this.bot.ameAPI.generate('invert', {
      url: usr.user.displayAvatarURL({format: 'png', size: 1024}),
    });
    return await msg.channel.send(
      new MessageAttachment(imgBuffer, `invert-${new Date('now')}.png`)
    );
  }
}
module.exports = Invert;
